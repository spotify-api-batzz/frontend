import { all, put, takeEvery } from "redux-saga/effects";

// Actions
import { fetchAPIRequest, fetchAPISuccess } from "../reducers/common.reducer";

// Helpers
import request from "helpers/request";
import { AxiosResponse } from "axios";
import queryString from "query-string";
import { Buffer } from "buffer";
import { Endpoints, EndpointTypes } from "types";
import { isEqual, map } from "lodash";
import { TopSongs } from "graphql/types";

let topSongHandler = (data: TopSongs) => {
  data.topSongs.nodes = data.topSongs?.nodes.filter((node, i) => {
    const isSameAsLast = isEqual(
      map(node.topSongData.nodes, (a) => a.song.id),
      map(data.topSongs.nodes[i - 1]?.topSongData.nodes, (a) => a.song.id)
    );
    if (isSameAsLast) return false;
    return true;
  });
  return data;
};

// figure out stronger typing if possible, not a fan of the casting
const applyEndpointMiddleware = <T extends keyof typeof Endpoints>(
  endpoint: T,
  data: EndpointTypes[T]
): any => {
  switch (endpoint) {
    case "topSongs":
      return topSongHandler(data as TopSongs);
  }
  return data;
};

function* get({
  payload: { query, endpoint },
}: ReturnType<typeof fetchAPIRequest>) {
  try {
    const b64Query = Buffer.from(query).toString("base64");
    const queryParams = queryString.stringify({ query: b64Query });
    let req: AxiosResponse<any> = yield request.get(`/?${queryParams}`, {
      headers: {
        "x-cache-age-key": endpoint,
      },
    });

    const data = applyEndpointMiddleware(endpoint, req.data.data);

    yield put(
      fetchAPISuccess({
        data,
        endpoint,
      })
    );
  } catch (error) {
    console.error(error);
  }
}

function* watchGet() {
  yield takeEvery(fetchAPIRequest, get);
}

export function* commonSaga() {
  yield all([watchGet()]);
}

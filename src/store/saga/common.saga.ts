import { all, put, takeEvery } from "redux-saga/effects";

// Actions
import { fetchAPIRequest, fetchAPISuccess } from "../reducers/common.reducer";

// Helpers
import request from "helpers/request";
import { AxiosResponse } from "axios";
import queryString from "query-string";
import { Buffer } from "buffer";
import { Endpoints, EndpointResponses } from "types";
import { isEqual, map } from "lodash";
import { TopSongs } from "graphql/types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

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
  data: EndpointResponses[T]
): any => {
  switch (endpoint) {
    case "topSongs":
      return topSongHandler(data as TopSongs);
  }
  return data;
};

const getEndpointTime = (endpoint: keyof typeof Endpoints) => {
  const utcHour = dayjs.utc().hour();
  let divideBy = 1;
  if (endpoint === "recentListens") {
    divideBy = 1;
  } else {
    divideBy = 6;
  }

  return Math.floor(utcHour / divideBy);
};

function* get({
  payload: { query, endpoint },
}: ReturnType<typeof fetchAPIRequest>) {
  try {
    const b64Query = Buffer.from(query).toString("base64");
    const hour = getEndpointTime(endpoint);
    const queryParams = queryString.stringify({ query: b64Query, hour });

    let req: AxiosResponse<any> = yield request.get(`/graphql?${queryParams}`, {
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

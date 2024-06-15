import { AxiosResponse } from "axios";
import { Buffer } from "buffer";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
// Helpers
import request from "helpers/request";
import { isEqual, map } from "lodash";
import queryString from "query-string";
import { all, put, takeEvery } from "redux-saga/effects";
import { EndpointResponses, Endpoints, TopSongs } from "types";
// Actions
import { fetchAPIRequest, fetchAPISuccess } from "../reducers/common.reducer";

dayjs.extend(utc);

let topSongHandler = (data: TopSongs) => {
  data.topSongs.nodes = data.topSongs?.nodes.filter((node, i) => {
    const isSameAsLast = isEqual(
      map(node.topSongData.nodes, (a) => a.song.id),
      map(data.topSongs.nodes[i - 1]?.topSongData.nodes, (a) => a.song.id),
    );
    if (isSameAsLast) return false;
    return true;
  });
  return data;
};

// figure out stronger typing if possible, not a fan of the casting
const applyEndpointMiddleware = <T extends keyof typeof Endpoints>(
  endpoint: T,
  data: EndpointResponses[T],
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
  payload: { operationName, endpoint, variables },
}: ReturnType<typeof fetchAPIRequest>) {
  try {
    console.log("!!??");
    const vars = variables
      ? Buffer.from(JSON.stringify(variables)).toString("base64")
      : undefined;
    const hour = getEndpointTime(endpoint);
    const queryParams = queryString.stringify({
      operationName,
      hour,
      variables: vars,
    });

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
      }),
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

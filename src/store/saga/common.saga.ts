import { all, put, takeEvery } from "redux-saga/effects";

// Actions
import { fetchAPIRequest, fetchAPISuccess } from "../reducers/common.reducer";

// Helpers
import request from "helpers/request";
import { AxiosResponse } from "axios";
import queryString from "query-string";
import { Buffer } from "buffer";

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

    yield put(
      fetchAPISuccess({
        data: req.data,
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

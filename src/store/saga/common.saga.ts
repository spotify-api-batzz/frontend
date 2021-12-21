import { all, put, takeEvery } from "redux-saga/effects";

// Actions
import { fetchAPIRequest, fetchAPISuccess } from "../reducers/common.reducer";

// Helpers
import request from "helpers/request";
import { AxiosResponse } from "axios";

function* get({
  payload: { query, endpoint },
}: ReturnType<typeof fetchAPIRequest>) {
  try {
    let req: AxiosResponse<any> = yield request.post(`/graphql`, {
      query,
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

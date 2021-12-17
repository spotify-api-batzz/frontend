import { all, put, takeEvery } from "redux-saga/effects";

// Actions
import { fetchAPIRequest } from "../actions";

// Helpers
import request from "helpers/request";
import { AxiosResponse } from "axios";

function* get({ endpoint, type }: ReturnType<typeof fetchAPIRequest>) {
  try {
    let req: AxiosResponse<any> = yield request.get(`/${endpoint}`);
    yield put({ type: "123" });
  } catch (error) {}
}

function* watchGet() {
  yield takeEvery(fetchAPIRequest, get);
}

export function* authSaga() {
  yield all([watchGet()]);
}

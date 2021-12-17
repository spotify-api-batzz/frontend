import * as actions from "./actionTypes";

type validEndpoints = "songs";

export type CommonActionType =
  | typeof actions.FETCH_API_REQUEST
  | typeof actions.FETCH_API_SUCCESS
  | typeof actions.FETCH_API_FAILURE;

export const fetchAPIRequest = (endpoint: validEndpoints) => ({
  type: actions.FETCH_API_REQUEST,
  endpoint,
});

const fetchAPISuccess = () => ({
  type: actions.FETCH_API_SUCCESS,
});

const fetchAPIFailure = () => ({
  type: actions.FETCH_API_FAILURE,
});

export const commonActions = {
  fetchAPIRequest,
  fetchAPISuccess,
  fetchAPIFailure,
};

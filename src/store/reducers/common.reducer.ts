import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { Endpoints, EndpointTypes } from "types";

type CommonSubState<T> = {
  data: T;
  loading: boolean;
  loaded: boolean;
};

type CommonState = {
  [T in Endpoints]: CommonSubState<EndpointTypes[T]>;
};

const createCommonSubstate = () => ({
  data: [],
  loading: false,
  loaded: false,
});

const initialState = Object.keys(Endpoints).reduce(
  (prev, curr) => ({ ...prev, [curr]: createCommonSubstate() }),
  {}
) as CommonState;

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    fetchAPIRequest(
      state,
      action: PayloadAction<{ query: string; endpoint: Endpoints }>
    ) {
      state[action.payload.endpoint].loading = true;
      state[action.payload.endpoint].loaded = false;
      state[action.payload.endpoint].data = [];
    },
    fetchAPISuccess(
      state,
      action: PayloadAction<{ data: AxiosResponse<any>; endpoint: Endpoints }>
    ) {
      state[action.payload.endpoint].loading = false;
      state[action.payload.endpoint].loaded = true;
      state[action.payload.endpoint].data = action.payload.data;
    },
    fetchAPIFailure(state, action: PayloadAction<number>) {},
  },
});

export const { fetchAPIRequest, fetchAPISuccess, fetchAPIFailure } =
  commonSlice.actions;
export default commonSlice.reducer;

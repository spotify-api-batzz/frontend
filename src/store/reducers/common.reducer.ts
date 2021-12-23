import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { Endpoints, EndpointTypes } from "types";

interface CommonSubState<T> {
  data: T;
  loaded: boolean;
}
type CommonState = {
  [T in Endpoints]: CommonSubState<EndpointTypes[T]>;
};

const createCommonSubstate = () => ({
  data: [],
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
    ) {},
    fetchAPISuccess(
      state,
      action: PayloadAction<{ data: AxiosResponse<any>; endpoint: Endpoints }>
    ) {
      state[action.payload.endpoint].data = action.payload.data.data;
      state[action.payload.endpoint].loaded = true;
    },
    fetchAPIFailure(state, action: PayloadAction<number>) {},
  },
});

export const { fetchAPIRequest, fetchAPISuccess, fetchAPIFailure } =
  commonSlice.actions;
export default commonSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pick } from "lodash";
import { EndpointResponses, Endpoints, Meta } from "types";

type CommonSubState<T> = {
  data: T;
  loading: boolean;
  loaded: boolean;
  meta?: Meta;
};

type CommonState = {
  [T in Endpoints]: CommonSubState<EndpointResponses[T]>;
};

const createCommonSubstate = () => ({
  data: [],
  loading: false,
  loaded: false,
});

const deriveMeta = (data: any): Meta | undefined => {
  if ("pageInfo" in data) {
    return pick(data, ["pageInfo", "totalCount"]);
  }
};

const initialState = Object.keys(Endpoints).reduce(
  (prev, curr) => ({ ...prev, [curr]: createCommonSubstate() }),
  {},
) as CommonState;

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    fetchAPIRequest(
      state,
      action: PayloadAction<{
        operationName: string;
        endpoint: Endpoints;
        variables?: Record<string, unknown>;
      }>,
    ) {
      const stateToUpdate = state[action.payload.endpoint];
      stateToUpdate.loading = true;
      stateToUpdate.loaded = false;
      stateToUpdate.data = [];
    },
    fetchAPISuccess(
      state,
      action: PayloadAction<{ data: EndpointResponses; endpoint: Endpoints }>,
    ) {
      const stateToUpdate = state[action.payload.endpoint];
      stateToUpdate.loading = false;
      stateToUpdate.loaded = true;
      stateToUpdate.data = action.payload.data;
      stateToUpdate.meta = deriveMeta(
        action.payload.data[action.payload.endpoint],
      );
    },
    fetchAPIFailure(state, action: PayloadAction<number>) {},
  },
});

export const { fetchAPIRequest, fetchAPISuccess, fetchAPIFailure } =
  commonSlice.actions;
export default commonSlice.reducer;

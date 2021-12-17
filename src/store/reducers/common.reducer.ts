import { CommonActionType } from "../actions";
import * as actionTypes from "../actions/actionTypes";
const defaultCommonState = {};

const reducer = (state = defaultCommonState, action: CommonActionType) => {
  switch (action) {
    case actionTypes.FETCH_API_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_API_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.FETCH_API_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;

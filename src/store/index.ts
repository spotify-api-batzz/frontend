import { configureStore } from "@reduxjs/toolkit";
import {
  shallowEqual,
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import createSagaMiddleware from "redux-saga";
import commonReducer from "./reducers/common.reducer";
import { commonSaga } from "./saga";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: { common: commonReducer },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(commonSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useShallowSelector = <TSelected>(
  selector: (state: RootState) => TSelected,
) => useSelector(selector, shallowEqual);

export default store;

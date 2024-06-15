import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routes from "pages/Routes";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; // Redux
import "./output.css";
import reportWebVitals from "./reportWebVitals";
import store from "./store";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <Provider store={store}>
          <Routes />
        </Provider>
      </NextUIProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

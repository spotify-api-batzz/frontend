import { mustGetEnv } from "@src/util/env";
import axios from "axios";

const request = () => {
  const APIBaseURL = mustGetEnv("VITE_API_BASE_URL");
  const ax = axios.create({
    baseURL: APIBaseURL,
  });
  return ax;
};

export default request();

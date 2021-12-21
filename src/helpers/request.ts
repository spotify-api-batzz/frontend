import axios from "axios";
import { mustGetEnv } from "util/env";

const request = () => {
  const APIBaseURL = mustGetEnv("REACT_APP_API_BASE_URL");
  const ax = axios.create({ baseURL: APIBaseURL });
  return ax;
};

export default request();

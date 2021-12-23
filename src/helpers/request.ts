import axios from "axios";
import { getEnv, mustGetEnv } from "util/env";

const request = () => {
  const APIBaseURL = mustGetEnv("REACT_APP_API_BASE_URL");
  const authHeader = getEnv("REACT_APP_AUTH_HEADER");
  const ax = axios.create({
    baseURL: APIBaseURL,
    headers: authHeader ? { authorization: authHeader } : {},
  });
  return ax;
};

export default request();

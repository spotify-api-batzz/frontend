import axios from "axios";

const request = () => {
  const ax = axios.create();
  return ax;
};

export default request();

import { $fetch } from "ofetch";
import qs from "qs";
import { ListensPerDay, Stats } from "./types";

// TODO: shared fetch instance unsntatic methods iwth a singleton? or provider..
class API {
  static makeUrl = (url: string) => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    return `${baseUrl}${url}`;
  };

  static listensPerDay = async (
    userId: string,
    before?: Date,
    after?: Date,
  ): Promise<ListensPerDay[]> => {
    const queryString = qs.stringify({
      before: before?.valueOf(),
      after: after?.valueOf(),
      userId,
    });

    return $fetch(API.makeUrl(`/aggregate/listensPerDay?${queryString}`));
  };

  static timeOfDay = async (
    userId: string,
    before?: Date,
    after?: Date,
  ): Promise<ListensPerDay[]> => {
    const queryString = qs.stringify({
      before: before?.valueOf(),
      after: after?.valueOf(),
      userId,
    });

    return $fetch(API.makeUrl(`/aggregate/timeOfDay?${queryString}`));
  };

  static stats = async (userId: string): Promise<Stats> => {
    const queryString = qs.stringify({
      userId,
    });

    return $fetch(API.makeUrl(`/aggregate/stats?${queryString}`));
  };
}

export default API;

import { $fetch } from "ofetch";
import qs from "qs";
import { ListensPerDay, Stats, TimeOfDay } from "./types";

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
      hour: 1,
    });

    return $fetch(API.makeUrl(`/aggregate/listensPerDay?${queryString}`));
  };

  static timeOfDay = async (
    userId: string,
    before?: Date,
    after?: Date,
  ): Promise<TimeOfDay[]> => {
    const queryString = qs.stringify({
      before: before?.valueOf(),
      after: after?.valueOf(),
      userId,
      hour: 1,
    });

    return $fetch(API.makeUrl(`/aggregate/timeOfDay?${queryString}`));
  };

  static stats = async (userId: string): Promise<Stats> => {
    const queryString = qs.stringify({
      userId,
      hour: 1,
    });

    return $fetch(API.makeUrl(`/aggregate/stats?${queryString}`));
  };
}

export default API;

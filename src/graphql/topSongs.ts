import { Songs } from "./types";

export enum timePeriods {
  short = "short",
  medium = "medium",
  long = "long",
}

export const getTopSongs = (
  userId: string,
  time = timePeriods.short,
  count = 5
) => {
  return `
  query MyQuery {
    topSongs(first: ${count}, condition:{userId:"${userId}"}, orderBy:CREATED_AT_DESC) {
      nodes {
        createdAt
        user {
          username
        }
        topSongData(first: 25, orderBy: ORDER_ASC, condition: {timePeriod: "${time}"}) {
          nodes {
            order
            id
            song {
              id
              name
              artist {
                name
              }
              album {
                name
                thumbnails{
                  nodes {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  `;
};

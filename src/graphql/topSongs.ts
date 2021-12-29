import { Songs } from "./types";

export enum timePeriods {
  short = "short",
  medium = "medium",
  long = "long",
}

export const getTopSongs = (
  userId: string,
  startDate: string,
  endDate: string,
  time = timePeriods.short,
  count = 5
) => {
  return `
  query MyQuery {
    topSongs(
      first: ${count}
      filter: {
        userId: { equalTo: "${userId}" }
        createdAt: {
          greaterThanOrEqualTo: "${startDate}"
          lessThanOrEqualTo: "${endDate}"
        }
      }
      orderBy: CREATED_AT_DESC
    ) {
      nodes {
        createdAt
        id
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
                    height
                    width
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

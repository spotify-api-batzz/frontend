import { Songs } from "./types";

export enum timePeriods {
  short = "short",
  medium = "medium",
  long = "long",
}

export const getTopArtists = (
  userId: string,
  startDate: string,
  endDate: string,
  time = timePeriods.short,
  count = 5
) => {
  return `
  query MyQuery {
    topArtists(first: ${count},       
      filter: {
        userId: { equalTo: "${userId}" }
        createdAt: {
          greaterThanOrEqualTo: "${startDate}"
          lessThanOrEqualTo: "${endDate}"
        }
      },
      orderBy:CREATED_AT_DESC) {
      nodes {
        user {
          username
        }
        createdAt
        topArtistData(first: 25, orderBy: ORDER_ASC, condition: {timePeriod: "${time}"}) {
          nodes {
            order
            id
            artist {
              id
              name
              thumbnails {
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
  `;
};

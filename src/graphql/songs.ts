import { Songs } from "./types";

export const getAllSongs = (offset = 0, count = 500) => {
  return `
  query MyQuery {
    songs(offset: ${offset}, first: ${count}) {
      nodes {
        name
        id
        album {
          name
          createdAt
          thumbnails {
            nodes {
              url
            }
          }
        }
        artist {
          name
        }
      }
      pageInfo {
        hasNextPage
        startCursor
        hasPreviousPage
        endCursor
      }
      totalCount
    }
  }
  `;
};

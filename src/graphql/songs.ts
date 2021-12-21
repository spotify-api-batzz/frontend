import { Songs } from "./types";

export const getAllSongs = (offset = 0, count = 500) => {
  return `
  query MyQuery {
    allSongs(offset: ${offset}, first: ${count}) {
      nodes {
        name
        id
        albumByAlbumId {
          name
          createdAt
          thumbnails {
            nodes {
              url
            }
          }
        }
        artistByArtistId {
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

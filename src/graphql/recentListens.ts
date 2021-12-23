export const getRecentListens = (userId: string, count = 10, offset = 0) => {
  return `
  query MyQuery {
    allRecentListens(
      orderBy: CREATED_AT_DESC
      condition: { userId: "${userId}" }
      first: ${count}
      offset: ${offset}
    ) {
      nodes {
        id
            songBySongId {
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
            playedAt
        userByUserId {
          username
        }
      }
      pageInfo {
        startCursor
        hasPreviousPage
        hasNextPage
        endCursor
      }
      totalCount
    }
  }`;
};

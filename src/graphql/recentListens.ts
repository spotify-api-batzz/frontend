export const getRecentListens = (userId: string, count = 10, offset = 0) => {
  return `
  query MyQuery {
    recentListens(
      orderBy: PLAYED_AT_DESC
      condition: { userId: "${userId}" }
      first: ${count}
      offset: ${offset}
    ) {
      nodes {
        id
            song {
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
            playedAt
        user {
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

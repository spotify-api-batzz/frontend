export const getRecentListens = (userId: string) => {
  return `
  query MyQuery {
    allRecentListens(
      orderBy: CREATED_AT_DESC
      condition: { userId: "${userId}" }
      first: 10
    ) {
      nodes {
        recentListenDataByRecentListenId(orderBy: PLAYED_AT_DESC) {
          nodes {
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
          }
        }
        userByUserId {
          username
        }
      }
    }
  }`;
};

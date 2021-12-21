import React, { useEffect } from "react";
import { useDispatch, useSelector } from "store";
import { Endpoints } from "types";
import { fetchAPIRequest } from "store/reducers/common.reducer";
import { User } from "components/users/User";
import { getRecentListens } from "graphql/recentListens";
import { useParams } from "react-router-dom";
import RecentListen from "components/recentListen/RecentListen";
import dayjs from "dayjs";
import Container from "components/layout/Container";

function RecentListens() {
  const params = useParams();
  const dispatch = useDispatch();
  const recentListens = useSelector((state) => state.common.recentListens.data);

  useEffect(() => {
    dispatch(
      fetchAPIRequest({
        query: getRecentListens(params.id!),
        endpoint: Endpoints.recentListens,
      })
    );
  }, [dispatch, params]);

  return (
    <Container>
      {recentListens?.allRecentListens?.nodes.map(
        ({ recentListenDataByRecentListenId: { nodes } }) => {
          return nodes.map(({ songBySongId, playedAt }) => {
            return (
              <RecentListen
                name={songBySongId.name}
                artist={songBySongId.artistByArtistId}
                album={songBySongId.albumByAlbumId}
                diff={dayjs(dayjs()).diff(playedAt, "hour").toString()}
              />
            );
          });
        }
      )}
    </Container>
  );
}

export default RecentListens;

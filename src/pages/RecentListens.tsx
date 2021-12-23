import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "store";
import { Endpoints } from "types";
import { fetchAPIRequest } from "store/reducers/common.reducer";
import { getRecentListens } from "graphql/recentListens";
import { useParams } from "react-router-dom";
import RecentListen from "components/recentListen/RecentListen";
import dayjs from "dayjs";
import Container from "components/layout/Container";
import Paginator from "components/layout/Paginator";
import styled from "styled-components";

const RecentListensWrapperDiv = styled.div`
  margin: 20px 0 0 0;
`;

const itemsPerPage = 25;

function RecentListens() {
  const params = useParams();
  const dispatch = useDispatch();
  const recentListens = useSelector((state) => state.common.recentListens);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    dispatch(
      fetchAPIRequest({
        query: getRecentListens(params.id!, itemsPerPage, offset),
        endpoint: Endpoints.recentListens,
      })
    );
  }, [dispatch, params, offset]);

  return (
    <Container>
      {recentListens.loaded && (
        <Paginator
          meta={recentListens.data?.allRecentListens}
          nodes={recentListens.data?.allRecentListens?.nodes}
          perPage={itemsPerPage}
          setOffset={setOffset}
          curPage={offset / itemsPerPage + 1}
        />
      )}
      <RecentListensWrapperDiv>
        {recentListens.data?.allRecentListens?.nodes.map(
          ({ playedAt, songBySongId }) => {
            return (
              <RecentListen
                name={songBySongId.name}
                artist={songBySongId.artistByArtistId}
                album={songBySongId.albumByAlbumId}
                diff={dayjs(dayjs()).diff(playedAt, "hour")}
              />
            );
          }
        )}
      </RecentListensWrapperDiv>
    </Container>
  );
}

export default RecentListens;

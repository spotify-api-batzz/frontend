import Container from "@src/components/layout/Container";
import Paginator from "@src/components/layout/Paginator";
import RecentListen from "@src/components/recentListen/RecentListen";
import { useDispatch, useShallowSelector } from "@src/store";
import { Endpoints } from "@src/types";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAPIRequest } from "store/reducers/common.reducer";
import styled from "styled-components";

const RecentListensWrapperDiv = styled.div`
  margin: 20px 0 0 0;
`;

const itemsPerPage = 25;

function RecentListens() {
  const params = useParams();
  const dispatch = useDispatch();
  const recentListens = useShallowSelector(
    (state) => state.common.recentListens,
  );
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    dispatch(
      fetchAPIRequest({
        operationName: "getRecentListens",
        variables: { userId: params.id!, first: itemsPerPage, offset },
        endpoint: Endpoints.recentListens,
      }),
    );
  }, [dispatch, params, offset]);

  console.log(recentListens.meta);

  return (
    <Container>
      {recentListens.meta && (
        <Paginator
          meta={recentListens.meta}
          perPage={itemsPerPage}
          setOffset={setOffset}
          curPage={offset / itemsPerPage + 1}
        />
      )}
      <RecentListensWrapperDiv>
        {recentListens.data?.recentListens?.nodes.map(
          ({ id, playedAt, song }) => {
            return (
              <RecentListen
                key={id}
                name={song.name}
                artist={song.artist}
                album={song.album}
                diff={dayjs(dayjs()).diff(playedAt, "hour")}
              />
            );
          },
        )}
      </RecentListensWrapperDiv>
    </Container>
  );
}

export default RecentListens;

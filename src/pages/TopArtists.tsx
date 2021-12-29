import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "store";
import { Endpoints } from "types";
import { fetchAPIRequest } from "store/reducers/common.reducer";
import { useParams } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import Container from "components/layout/Container";
import styled from "styled-components";
import { getTopSongs, timePeriods } from "graphql/topSongs";
import { capitalize, groupBy, isEqual, map } from "lodash";
import { TopArtistsNode, TopSongsNode } from "graphql/types";
import SongCard from "components/songs/SongCard";
import Tooltip from "components/helpers/Tooltip";
import { getTopArtists } from "graphql/topArtists";
import ArtistCard from "components/artists/ArtistCard";

interface Timestamp {
  start: Dayjs;
  end: Dayjs;
}

const TopSongMarkerDiv = styled.div`
  margin: 0 0 10px;
  display: flex;
  align-items: center;
  overflow-x: scroll;
  padding: 0 0 10px 0;
  p {
    margin: 0;
    white-space: nowrap;
  }
`;

const TopSongYearDiv = styled.div`
  padding: 10px;
  position: relative;
  width: 100%;
  display: flex;
  flex-flow: column;
  h1 {
    display: flex;
    margin: 0;
    color: #fff;
    padding: 5px 10px;
    font-weight: 500;
    left: 10px;
    background-color: #000;
    margin: 0 0 10px 0;
  }
`;

const TopSongContainerDiv = styled.div`
  margin: 0 0 10px 0;
  img {
    height: 80px;
    margin: 0 10px 0 0;
    border: 1px solid #c1c1c1;
  }
`;
function TopArtists() {
  const params = useParams();
  const dispatch = useDispatch();
  const topSongs = useSelector((state) => state.common.topArtists);
  const [timePeriod, setTimePeriod] = useState<timePeriods>(timePeriods.short);

  const [groupedData, setGroupedData] = useState<
    Record<string, TopArtistsNode[]>
  >({});

  useEffect(() => {
    dispatch(
      fetchAPIRequest({
        query: getTopArtists(params.id!, timePeriod, 50),
        endpoint: Endpoints.topArtists,
      })
    );
  }, [dispatch, params, timePeriod]);

  useEffect(() => {
    if (topSongs.loading) {
      const grouped = groupBy(topSongs.data.topArtists.nodes, (topArtist) =>
        dayjs(topArtist.createdAt).year()
      );
      let removeSame = Object.keys(grouped).reduce(
        (prev, year) => ({
          ...prev,
          [year]: grouped[year]
            .map((node, i) => {
              const isSameAsLast = isEqual(
                map(node.topArtistData.nodes, (a) => a.artist.id),
                map(
                  grouped[year][i - 1]?.topArtistData.nodes,
                  (a) => a.artist.id
                )
              );
              if (isSameAsLast) return null;
              return node;
            })
            .filter((item) => item !== null),
        }),
        {}
      );
      setGroupedData(removeSame);
    }
  }, [topSongs]);

  return (
    <Container>
      Time period
      <select onChange={(e) => setTimePeriod(e.target.value as timePeriods)}>
        {Object.keys(timePeriods).map((period) => (
          <option value={period}>{capitalize(period)}</option>
        ))}
      </select>
      <TopSongContainerDiv>
        {topSongs.loading &&
          Object.keys(groupedData).map((year) => {
            return (
              <TopSongYearDiv>
                <h1>{year}</h1>
                <div>
                  {groupedData[year].map((node, i) => {
                    return (
                      <TopSongMarkerDiv>
                        {node.topArtistData.nodes.map((artistNode) => (
                          <Tooltip
                            render={({ mouseX, mouseY }) => (
                              <ArtistCard
                                x={mouseX}
                                y={mouseY}
                                name={artistNode.artist.name}
                              />
                            )}
                          >
                            <img
                              alt=""
                              src={artistNode?.artist?.thumbnails?.nodes[0].url}
                            />
                          </Tooltip>
                        ))}
                        <p>{dayjs(node.createdAt).toString()}</p>
                      </TopSongMarkerDiv>
                    );
                  })}
                </div>
              </TopSongYearDiv>
            );
          })}
      </TopSongContainerDiv>
    </Container>
  );
}

export default TopArtists;

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
import { TopSongsNode } from "graphql/types";
import SongCard from "components/songs/SongCard";
import Tooltip from "components/helpers/Tooltip";

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
function TopSongs() {
  const params = useParams();
  const dispatch = useDispatch();
  const topSongs = useSelector((state) => state.common.topSongs);
  const [timePeriod, setTimePeriod] = useState<timePeriods>(timePeriods.short);

  const [groupedData, setGroupedData] = useState<
    Record<string, TopSongsNode[]>
  >({});

  useEffect(() => {
    dispatch(
      fetchAPIRequest({
        query: getTopSongs(params.id!, timePeriod, 50),
        endpoint: Endpoints.topSongs,
      })
    );
  }, [dispatch, params, timePeriod]);

  useEffect(() => {
    if (topSongs.loaded) {
      const grouped = groupBy(topSongs.data.topSongs.nodes, (topSong) =>
        dayjs(topSong.createdAt).year()
      );
      let removeSame = Object.keys(grouped).reduce(
        (prev, year) => ({
          ...prev,
          [year]: grouped[year]
            .map((node, i) => {
              const isSameAsLast = isEqual(
                map(node.topSongData.nodes, (a) => a.song.id),
                map(grouped[year][i - 1]?.topSongData.nodes, (a) => a.song.id)
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
        {topSongs.loaded &&
          Object.keys(groupedData).map((year) => {
            return (
              <TopSongYearDiv>
                <h1>{year}</h1>
                <div>
                  {groupedData[year].map((node, i) => {
                    console.log(node);
                    return (
                      <TopSongMarkerDiv>
                        {node.topSongData.nodes.map((songNode) => (
                          <Tooltip
                            render={({ mouseX, mouseY }) => (
                              <SongCard
                                x={mouseX}
                                y={mouseY}
                                name={songNode.song.name}
                                album={songNode.song.album?.name}
                                artist={songNode.song.artist?.name}
                              />
                            )}
                          >
                            <img
                              alt=""
                              src={
                                songNode?.song.album?.thumbnails?.nodes[0].url
                              }
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

export default TopSongs;

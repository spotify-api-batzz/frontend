import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "store";
import { Endpoints } from "types";
import { fetchAPIRequest } from "store/reducers/common.reducer";
import { useParams } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import Container from "components/layout/Container";
import styled from "styled-components";
import { getTopSongs, timePeriods } from "graphql/topSongs";
import { capitalize } from "lodash";
import Tooltip from "components/helpers/Tooltip";
import { getTopArtists } from "graphql/topArtists";
import ArtistCard from "components/artists/ArtistCard";
import {
  TopArtWrapperDiv,
  TopArtContainerDiv,
  ArtContainerDiv,
  DayMarkerDiv,
  MonthContainerDiv,
  TopContentContainerDiv,
  TopContentYearDiv,
  TopContentDiv,
} from "./TopSongs";
import { ThumbnailNode } from "../graphql/types";
import Button from "../components/helpers/Button";

interface Timestamp {
  start: Dayjs;
  end: Dayjs;
}

const TopArtistsDiv = styled.div`
  // overflow-y: scroll;
`;

const smallestThumbnail = (nodes: ThumbnailNode[]): ThumbnailNode => {
  let smallest: ThumbnailNode = nodes[0];
  for (const node of nodes) {
    if (node.height < smallest.height) {
      smallest = node;
    }
  }
  return smallest;
};

function TopArtists() {
  const params = useParams();
  const dispatch = useDispatch();
  const topArtists = useSelector((state) => state.common.topArtists);
  const [timePeriod, setTimePeriod] = useState<timePeriods>(timePeriods.short);

  const [{ start, end }, setSelectedMonths] = useState<{
    start: Dayjs;
    end: Dayjs;
  }>({ start: dayjs().startOf("month"), end: dayjs().endOf("month") });
  const [scrollLock, setScrollLock] = useState(false);
  // const [scroll, setScroll] = useState(0);
  const refs = useRef<Record<string, HTMLDivElement>>({});

  const changeDate = (time: "month" | "year" | "day", diff: number) => {
    setSelectedMonths(({ start, end }) => ({
      start: start.add(diff, time),
      end: end.add(diff, time),
    }));
  };

  useEffect(() => {
    dispatch(
      fetchAPIRequest({
        query: getTopArtists(
          params.id!,
          start.toISOString(),
          end.toISOString(),
          timePeriod,
          50
        ),
        endpoint: Endpoints.topArtists,
      })
    );
  }, [dispatch, params, timePeriod, start, end]);

  const setScroll = (scroll: number) => {
    if (scrollLock) return;
    for (const div in refs.current) {
      refs.current[div].scroll({ left: scroll });
    }
  };

  return (
    <Container>
      <TopContentContainerDiv>
        <TopContentYearDiv>
          <h1>{start.format("YYYY")}</h1>
          <MonthContainerDiv>
            <div>
              <Button onClick={(e) => changeDate("month", -1)}>{"<"}</Button>
              <h2>{start.format("MMMM")}</h2>
              <Button onClick={(e) => changeDate("month", 1)}>{">"}</Button>
            </div>
          </MonthContainerDiv>
          Time period
          <select
            onChange={(e) => setTimePeriod(e.target.value as timePeriods)}
          >
            {Object.keys(timePeriods).map((period) => (
              <option key={period} value={period}>
                {capitalize(period)}
              </option>
            ))}
          </select>
          <input
            type="checkbox"
            onClick={(e) => setScrollLock(e.currentTarget.checked)}
          />{" "}
          Scroll lock
          {topArtists.loaded && (
            <TopContentDiv>
              {topArtists.data.topArtists.nodes.map((node) => {
                const curDate = dayjs(node.createdAt);
                return (
                  <TopArtContainerDiv key={node.id}>
                    <TopArtWrapperDiv
                      ref={(ref) => {
                        if (ref) {
                          refs.current[node.id] = ref;
                        }
                      }}
                      onScroll={(e) => {
                        setScroll(e.currentTarget.scrollLeft);
                      }}
                    >
                      {
                        <DayMarkerDiv>
                          <div>{curDate.format("D")}</div>
                        </DayMarkerDiv>
                      }
                      {node.topArtistData.nodes.map((artistNode) => (
                        <Tooltip
                          key={artistNode.id}
                          render={({ mouseX, mouseY }) => (
                            <ArtistCard
                              x={mouseX}
                              y={mouseY}
                              name={artistNode.artist.name}
                            />
                          )}
                          wrapper={<ArtContainerDiv />}
                        >
                          {artistNode?.artist?.thumbnails && (
                            <img
                              alt=""
                              src={
                                smallestThumbnail(
                                  artistNode?.artist?.thumbnails?.nodes
                                ).url
                              }
                            />
                          )}
                        </Tooltip>
                      ))}
                      {/* <p>{curDate.toString()}</p> */}
                    </TopArtWrapperDiv>
                  </TopArtContainerDiv>
                );
              })}
            </TopContentDiv>
          )}
        </TopContentYearDiv>
      </TopContentContainerDiv>
    </Container>
  );
}

export default TopArtists;

// const TopArtContainerDiv = styled.div`
//   margin: 0 0 10px;
//   p {
//     margin: 0;
//     white-space: nowrap;
//   }
// `;

// const TopArtWrapperDiv = styled.div`
//   display: flex;
//   overflow: scroll;
//   align-items: center;
//   background-color: #000;
//   padding: 10px 0 10px 0;
// `;

// const ArtContainerDiv = styled.div`
//   height: 60px;
//   margin: 0 10px 0 0;
//   img {
//     height: 60px;
//     width: 60px;
//     box-sizing: border-box;
//   }
// `;

// const TopSongsDiv = styled.div`
//   // overflow-y: scroll;
// `;

// const TopSongYearDiv = styled.div`
//   position: relative;
//   width: 100%;
//   box-sizing: border-box;
//   flex-flow: column;
//   h1 {
//     text-align: center;
//     padding: 5px 10px;
//     font-weight: 500;
//     color: #fff;
//     background-color: #000;
//     margin: 0 0 10px 0;
//   }
// `;

// const TopSongContainerDiv = styled.div`
//   margin: 0 0 10px 0;
// `;

// const DayMarkerDiv = styled.div`
//   width: 40px;
//   height: 100%;
//   display: flex;
//   align-items: center;
//   padding: 5px;
//   flex-shrink: 0;
//   justify-content: center;
//   > div {
//     margin: auto;
//     padding: 5px;
//     background-color: #000;
//     color: #fff;
//   }
// `;

// const MonthContainerDiv = styled.div`
//   display: flex;
//   width: 100%;
//   background-color: #000;
//   margin: 0 0 8px 0;
//   > div {
//     display: flex;
//     margin: auto;
//     background-color: #000;
//   }
//   div > h2 {
//     width: 200px;
//     text-align: center;
//     margin: 0;
//     padding: 8px 10px;
//     font-size: 18px;
//     color: #fff;
//     font-weight: 400;
//   }
// `;

// const smallestThumbnail = (nodes: ThumbnailNode[]): ThumbnailNode => {
//   let smallest: ThumbnailNode = nodes[0];
//   for (const node of nodes) {
//     if (node.height < smallest.height) {
//       smallest = node;
//     }
//   }
//   return smallest;
// };

// function TopSongs() {
//   const params = useParams();
//   const dispatch = useDispatch();
//   const topSongs = useSelector((state) => state.common.topSongs);
//   const [timePeriod, setTimePeriod] = useState<timePeriods>(timePeriods.short);
//   const [{ start, end }, setSelectedMonths] = useState<{
//     start: Dayjs;
//     end: Dayjs;
//   }>({ start: dayjs().startOf("month"), end: dayjs().endOf("month") });
//   const [scrollLock, setScrollLock] = useState(false);
//   // const [scroll, setScroll] = useState(0);
//   const refs = useRef<Record<string, HTMLDivElement>>({});

//   useEffect(() => {
//     dispatch(
//       fetchAPIRequest({
//         query: getTopSongs(
//           params.id!,
//           start.toISOString(),
//           end.toISOString(),
//           timePeriod,
//           250
//         ),
//         endpoint: Endpoints.topSongs,
//       })
//     );
//   }, [dispatch, params, timePeriod, start, end]);

//   const changeDate = (time: "month" | "year" | "day", diff: number) => {
//     setSelectedMonths(({ start, end }) => ({
//       start: start.add(diff, time),
//       end: end.add(diff, time),
//     }));
//   };

//   const setScroll = (scroll: number) => {
//     if (scrollLock) return;
//     for (const div in refs.current) {
//       refs.current[div].scroll({ left: scroll });
//     }
//   };

//   return (
//     <Container>
//       <TopSongContainerDiv>
//         <TopSongYearDiv>
//           <h1>{start.format("YYYY")}</h1>
//           <MonthContainerDiv>
//             <div>
//               <Button onClick={(e) => changeDate("month", -1)}>{"<"}</Button>
//               <h2>{start.format("MMMM")}</h2>
//               <Button onClick={(e) => changeDate("month", 1)}>{">"}</Button>
//             </div>
//           </MonthContainerDiv>
//           Time period
//           <select
//             onChange={(e) => setTimePeriod(e.target.value as timePeriods)}
//           >
//             {Object.keys(timePeriods).map((period) => (
//               <option key={period} value={period}>
//                 {capitalize(period)}
//               </option>
//             ))}
//           </select>
//           <input
//             type="checkbox"
//             onClick={(e) => setScrollLock(e.currentTarget.checked)}
//           />{" "}
//           Scroll lock
//           {topSongs.loading && <div>loading</div>}
//           {topSongs.loaded && (
//             <TopSongsDiv>
//               {topSongs.data.topSongs.nodes.map((node) => {
//                 const curDate = dayjs(node.createdAt);
//                 return (
//                   <TopArtContainerDiv key={node.id}>
//                     <TopArtWrapperDiv
//                       ref={(ref) => {
//                         if (ref) {
//                           refs.current[node.id] = ref;
//                         }
//                       }}
//                       onScroll={(e) => {
//                         setScroll(e.currentTarget.scrollLeft);
//                       }}
//                     >
//                       {
//                         <DayMarkerDiv>
//                           <div>{curDate.format("D")}</div>
//                         </DayMarkerDiv>
//                       }
//                       {node.topSongData.nodes.map((songNode) => (
//                         <Tooltip
//                           key={songNode.id}
//                           render={({ mouseX, mouseY }) => (
//                             <SongCard
//                               x={mouseX}
//                               y={mouseY}
//                               name={songNode.song.name}
//                               album={songNode.song.album?.name}
//                               artist={songNode.song.artist?.name}
//                             />
//                           )}
//                           wrapper={<ArtContainerDiv />}
//                         >
//                           {songNode?.song.album?.thumbnails && (
//                             <img
//                               alt=""
//                               src={
//                                 smallestThumbnail(
//                                   songNode?.song.album?.thumbnails?.nodes
//                                 ).url
//                               }
//                             />
//                           )}
//                         </Tooltip>
//                       ))}
//                       {/* <p>{curDate.toString()}</p> */}
//                     </TopArtWrapperDiv>
//                   </TopArtContainerDiv>
//                 );
//               })}
//             </TopSongsDiv>
//           )}
//         </TopSongYearDiv>
//       </TopSongContainerDiv>
//     </Container>
//   );
// }

// export default TopSongs;
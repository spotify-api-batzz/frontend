import ArtistCard from "@src/components/artists/ArtistCard";
import Tooltip from "@src/components/helpers/Tooltip";
import Container from "@src/components/layout/Container";
import { useDispatch, useShallowSelector } from "@src/store";
import { Endpoints, ThumbnailNode, TimePeriods, timePeriods } from "@src/types";
import dayjs, { Dayjs } from "dayjs";
import { capitalize } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAPIRequest } from "store/reducers/common.reducer";
import Button from "../components/helpers/Button";
import {
  ArtContainerDiv,
  DayMarkerDiv,
  MonthContainerDiv,
  TopArtContainerDiv,
  TopArtWrapperDiv,
  TopContentContainerDiv,
  TopContentDiv,
  TopContentYearDiv,
} from "./TopSongs";

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
  const topArtists = useShallowSelector((state) => state.common.topArtists);
  const [timePeriod, setTimePeriod] = useState<TimePeriods>(timePeriods.short);

  const [{ start, end }, setSelectedMonths] = useState<{
    start: Dayjs;
    end: Dayjs;
  }>({ start: dayjs().startOf("month"), end: dayjs().endOf("month") });
  const [scrollLock, setScrollLock] = useState(false);
  const refs = useRef<Record<string, HTMLDivElement>>({});

  const changeDate = (time: "month" | "year" | "day", diff: number) => {
    setSelectedMonths(({ start, end }) => ({
      start: start.add(diff, time),
      end: end.add(diff, time),
    }));
  };

  useEffect(() => {
    const variables = {
      userId: params.id!,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      period: timePeriod,
      first: 50,
    };
    dispatch(
      fetchAPIRequest({
        operationName: "getTopArtists",
        variables,
        endpoint: Endpoints.topArtists,
      }),
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
                                  artistNode?.artist?.thumbnails?.nodes,
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

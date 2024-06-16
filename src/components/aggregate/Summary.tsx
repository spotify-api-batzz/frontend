import { useQuery } from "@tanstack/react-query";
import React from "react";
import API from "../../api/api";
import Flex from "../helpers/Flex";
import Count from "./Count";
import TimeOfDayStats from "./TimeOfDayStats";
import UniqueStats from "./Uniques";

interface SummaryProps {
  userId: string;
}

const Summary: React.FC<SummaryProps> = ({ userId }) => {
  const listensPerDay = useQuery({
    queryKey: ["stats"],
    queryFn: () => API.stats(userId),
  });

  if (listensPerDay.isLoading || !listensPerDay.data) {
    return <></>;
  }

  const { songs, albums } = listensPerDay.data;

  return (
    <div>
      <Count aggregation={songs} entityName="song" />
      <Count aggregation={albums} entityName="album" />
      <Flex flow="row">
        <h1>General statistics</h1>
        <TimeOfDayStats timeListenedTo={listensPerDay.data.timeListenedTo} />
        <UniqueStats stats={listensPerDay.data} />
      </Flex>
    </div>
  );
};

export default Summary;

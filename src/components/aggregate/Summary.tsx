import { useQuery } from "@tanstack/react-query";
import React from "react";
import API from "../../api/api";
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
    <div style={{ display: "flex", flexFlow: "column" }}>
      <Count aggregation={songs} entityName="song" />
      <Count aggregation={albums} entityName="album" />
      <div style={{ display: "flex" }}>
        <TimeOfDayStats timeListenedTo={listensPerDay.data.timeListenedTo} />
        <UniqueStats stats={listensPerDay.data} />
      </div>
    </div>
  );
};

export default Summary;

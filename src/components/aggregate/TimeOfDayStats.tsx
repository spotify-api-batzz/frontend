import React from "react";
import { TimeListenedTo } from "../../api/types";
import Card from "../helpers/Card";

interface TimeOfDayStatsProps {
  timeListenedTo: TimeListenedTo[];
}

const TimeOfDayStats: React.FC<TimeOfDayStatsProps> = ({ timeListenedTo }) => {
  const chunks = timeListenedTo.map((entity) => (
    <div className="flex flex-col">
      <p className="text-md">{entity.time_of_day}</p>
      <p className="text-small text-default-500">{entity.count} listens</p>
    </div>
  ));

  return <Card title="Time of day" chunks={chunks} width="50%" />;
};

export default TimeOfDayStats;

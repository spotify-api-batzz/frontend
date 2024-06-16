import React from "react";
import { Stats } from "../../api/types";
import Card from "../helpers/Card";

const uniques = [
  {
    key: "uniqueAlbums",
    name: "unique albums",
  },
  { key: "uniqueSongs", name: "unique songs" },
  { key: "uniqueArtists", name: "unique songs" },
] as const;

interface UniqueStatsProps {
  stats: Stats;
}

const UniqueStats: React.FC<UniqueStatsProps> = ({ stats }) => {
  const chunks = uniques.map(({ key, name }) => (
    <div className="flex flex-col">
      <p className="text-small text-default-500">
        You listened to {stats[key].month} {name} this month
      </p>
      <p className="text-small text-default-500">
        You listened to {stats[key].year} {name} this year
      </p>
    </div>
  ));

  return <Card width="50%" title="How unique are you" chunks={chunks} />;
};

export default UniqueStats;

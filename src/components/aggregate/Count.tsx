import { Image } from "@nextui-org/react";
import _ from "lodash";
import React from "react";
import { EntityAggregation, EntityCount } from "../../api/types";
import Card from "../helpers/Card";
const entityCountTypes = [
  {
    type: "all time",
    key: "allTime",
  },
  {
    type: "this year",
    key: "year",
  },
  {
    type: "this month",
    key: "month",
  },
] as const;

const Count: React.FC<{
  aggregation: EntityAggregation;
  entityName: "song" | "album";
}> = ({ aggregation, entityName }) => (
  <>
    <h1>Top {_.capitalize(entityName)} by period</h1>
    <div style={{ display: "flex" }}>
      {entityCountTypes.map(({ type, key }) => (
        <EntityCounts
          entities={aggregation[key]}
          entityName={entityName}
          type={type}
        />
      ))}
    </div>
  </>
);

const EntityCounts: React.FC<{
  entities: EntityCount[];
  entityName: string;
  type: string;
}> = ({ entities, entityName, type }) => {
  const chunks = entities.map((entity) => (
    <>
      <Image
        style={{ minWidth: 40 }}
        alt="nextui logo"
        height={40}
        radius="sm"
        src={entity.image_url}
        width={40}
      />
      <div className="flex flex-col truncate">
        <p className="text-md  text-ellipsis overflow-hidden">{entity.name}</p>
        <p className="text-small text-default-500">{entity.count} listens</p>
      </div>
    </>
  ));
  return (
    <Card
      title={`Top ${entityName}s of ${type}`}
      width="33.3333%"
      chunks={chunks}
    />
  );
};

export default Count;

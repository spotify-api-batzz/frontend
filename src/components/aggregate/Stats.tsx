import { Card, CardBody, CardHeader, Divider, Image } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";
import API from "../../api/api";
import { EntityCount } from "../../api/types";

const CardWrapperDiv = styled.div`
  margin-bottom: 20px;
`;

const uniques = ["uniqueAlbums", "uniqueSongs", "uniqueArtists"] as const;

const EntityCounts: React.FC<{
  entities: EntityCount[];
  entityName: string;
  type: string;
}> = ({ entities, entityName, type }) => {
  return (
    <CardWrapperDiv>
      <Card className="max-w-[400px] mb-2.5">
        <CardHeader className="flex gap-3">
          <h1 className="block font-semibold text-gray-900">
            Top {entityName}s of {type}
          </h1>
        </CardHeader>
        {entities.map((entity) => (
          <>
            <Divider />
            <CardBody className="flex gap-3 flex-row">
              <Image
                alt="nextui logo"
                height={40}
                radius="sm"
                src={entity.image_url}
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-md">{entity.name}</p>
                <p className="text-small text-default-500">
                  {entity.count} listens
                </p>
              </div>
            </CardBody>
          </>
        ))}
      </Card>
    </CardWrapperDiv>
  );
};

const Stats: React.FC<{ userId: string }> = ({ userId }) => {
  const listensPerDay = useQuery({
    queryKey: ["stats"],
    queryFn: () => API.stats(userId),
  });

  if (listensPerDay.isLoading || !listensPerDay.data) {
    return <></>;
  }

  const { songs, albums } = listensPerDay.data;

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: 400 }}>
        <EntityCounts
          entities={songs.allTime}
          entityName="song"
          type={"all time"}
        />
        <EntityCounts
          entities={songs.year}
          entityName="song"
          type={"this year"}
        />
        <EntityCounts
          entities={songs.month}
          entityName="song"
          type={"this month"}
        />
      </div>
      <div style={{ width: 400 }}>
        <EntityCounts
          entities={albums.allTime}
          entityName="album"
          type={"all time"}
        />
        <EntityCounts
          entities={albums.year}
          entityName="album"
          type={"this year"}
        />
        <EntityCounts
          entities={albums.month}
          entityName="album"
          type={"this month"}
        />
      </div>
      <div>
        <Card className="max-w-[400px] mb-2.5">
          <CardHeader className="flex gap-3">
            <h1 className="block font-semibold text-gray-900">Time of day</h1>
          </CardHeader>
          {listensPerDay.data.timeListenedTo.map((entity) => (
            <>
              <Divider />
              <CardBody className="flex gap-3 flex-row">
                {/* <Image
                  alt="nextui logo"
                  height={40}
                  radius="sm"
                  src={entity.image_url}
                  width={40}
                /> */}
                <div className="flex flex-col">
                  <p className="text-md">{entity.time_of_day}</p>
                  <p className="text-small text-default-500">
                    {entity.count} listens
                  </p>
                </div>
              </CardBody>
            </>
          ))}
        </Card>
      </div>
      <div>
        <Card className="max-w-[400px] mb-2.5">
          <CardHeader className="flex gap-3">
            <h1 className="block font-semibold text-gray-900">
              How unique are you
            </h1>
          </CardHeader>
          {uniques.map((key) => (
            <>
              <Divider />
              <CardBody className="flex gap-3 flex-row">
                <div className="flex flex-col">
                  <p className="text-small text-default-500">
                    You listened to {listensPerDay.data[key].month} {key} this
                    month
                  </p>
                  <p className="text-small text-default-500">
                    You listened to {listensPerDay.data[key].year} {key} this
                    year
                  </p>
                </div>
              </CardBody>
            </>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default Stats;

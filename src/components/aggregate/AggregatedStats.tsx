import React from "react";
import styled from "styled-components";
import { H1 } from "../helpers/Headers";
import ListensPerDayChart from "./ListensPerDayChart";
import Summary from "./Summary";
import TimeOfDayChart from "./TimeOfDayChart";

interface AggregatedStatsProps {
  userId: string;
}

const GraphContainerDiv = styled.div`
  display: flex;
  margin: 0 0 20px 0;
`;

const AggregatedStats: React.FC<AggregatedStatsProps> = ({ userId }) => (
  <>
    <H1>Aggregated statistics</H1>
    <h2>Charts</h2>
    <GraphContainerDiv>
      <ListensPerDayChart userId={userId} />
      <TimeOfDayChart userId={userId} />
    </GraphContainerDiv>
    <Summary userId={userId} />
  </>
);

export default AggregatedStats;

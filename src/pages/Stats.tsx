import { useParams } from "react-router-dom";
import styled from "styled-components";
import AggregatedStats from "../components/aggregate/AggregatedStats";

const ContainerDiv = styled.div`
  display: flex;
  flex-flow: column;
  width: 90%;
  margin: auto;
`;

const Stats = () => {
  const params = useParams();

  if (!params.id) {
    return <></>;
  }

  return (
    <ContainerDiv>
      <AggregatedStats userId={params.id} />
    </ContainerDiv>
  );
};

export default Stats;

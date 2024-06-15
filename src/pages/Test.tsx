import { useParams } from "react-router-dom";
import styled from "styled-components";
import ListensPerDay from "../components/aggregate/ListensPerDay";
import Stats from "../components/aggregate/Stats";
import TimeOfDay from "../components/aggregate/TimeOfDay";

const ContainerDiv = styled.div`
  display: flex;
`;
const Test = () => {
  const params = useParams();

  if (!params.id) {
    return <></>;
  }

  return (
    <ContainerDiv>
      <div>
        <ListensPerDay userId={params.id} />
        <TimeOfDay userId={params.id} />
      </div>
      <div>
        <Stats userId={params.id} />
      </div>
    </ContainerDiv>
  );
};

export default Test;

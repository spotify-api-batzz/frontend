import { Link } from "react-router-dom";
import styled from "styled-components";

interface UserProps {
  name: string;
  id: string;
}

const UserDiv = styled.div`
  display: flex;
  flex-flow: column;
  margin: 0 0 25px 0;
  h1 {
    font-size: 16px;
    margin: 0;
    padding: 5px 0 5px 0;
  }
  h2 {
    margin: 0;
    font-size: 14px;
  }
`;

export const User = ({ name, id }: UserProps) => {
  return (
    <UserDiv>
      <h1>{name}</h1>
      <div>
        <Link to={`/${id}/topsongs`}>
          <h2>Top Songs</h2>
        </Link>
        <Link to={`/${id}/topartists`}>
          <h2>Top Artists</h2>
        </Link>
        <Link to={`/${id}/recentListens`}>
          <h2>Listening History</h2>
        </Link>

        <Link to={`/${id}/test`}>
          <h2>Listening aa</h2>
        </Link>
        {/* <Link to={`/${id}/aggregate`}>
          <h2>Aggregates</h2>
        </Link> */}
      </div>
    </UserDiv>
  );
};

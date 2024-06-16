import { LuAreaChart, LuHistory, LuMusic, LuUser } from "react-icons/lu";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Card from "../helpers/Card";

interface UserProps {
  name: string;
  id: string;
}

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  h2 {
    margin: 0 0 0 6px;
    font-size: 12px;
  }
`;

export const User = ({ name, id }: UserProps) => {
  return (
    <Card
      title={name}
      width="25%"
      chunks={[
        <div>
          <LinkContainer>
            <LuMusic />
            <Link to={`/${id}/topsongs`}>
              <h2>Top Songs</h2>
            </Link>
          </LinkContainer>
          <LinkContainer>
            <LuUser />
            <Link to={`/${id}/topartists`}>
              <h2>Top Artists</h2>
            </Link>
          </LinkContainer>
          <LinkContainer>
            <LuHistory />
            <Link to={`/${id}/recentListens`}>
              <h2>Listening History</h2>
            </Link>
          </LinkContainer>
          <LinkContainer>
            <LuAreaChart />
            <Link to={`/${id}/aggregate`}>
              <h2>Aggregates</h2>
            </Link>
          </LinkContainer>
        </div>,
      ]}
    />
  );
};

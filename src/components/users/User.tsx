import { smallestThumbnail } from "helpers/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface UserProps {
  name: string;
  id: string;
}

const UserDiv = styled.div`
  display: flex;
  height: 60px;
  margin: 0 0 25px 0;
  h1 {
    font-size: 16px;
    margin: 0;
    padding: 5px 0 5px 0;
  }
`;

export const User = ({ name, id }: UserProps) => {
  return (
    <UserDiv>
      <Link to={`/${id}/recentListens`}>
        <h1>{name}</h1>
      </Link>
    </UserDiv>
  );
};

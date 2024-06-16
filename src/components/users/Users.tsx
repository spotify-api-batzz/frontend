import React from "react";
import styled from "styled-components";
import type { UserNode } from "../../types";
import { User } from "./User";

interface UsersProps {
  users: UserNode[];
}

const UsersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Users: React.FC<UsersProps> = ({ users }) => {
  console.log(users);
  return (
    <UsersContainer>
      {users.map(({ username, id }) => (
        <User name={username} id={id} />
      ))}
    </UsersContainer>
  );
};

export default Users;

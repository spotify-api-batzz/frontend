import React, { useEffect } from "react";
import { useDispatch, useSelector, useShallowSelector } from "store";
import { Endpoints } from "types";
import { fetchAPIRequest } from "store/reducers/common.reducer";
import { getUsers } from "graphql/users";
import { User } from "components/users/User";
import Container from "components/layout/Container";

function Users() {
  const dispatch = useDispatch();
  const users = useShallowSelector((state) => state.common.users.data);

  useEffect(() => {
    dispatch(fetchAPIRequest({ query: getUsers(), endpoint: Endpoints.users }));
  }, [dispatch]);

  return (
    <Container>
      {users?.users?.nodes.map(({ id, username }) => (
        <User key={id} id={id} name={username} />
      ))}
    </Container>
  );
}

export default Users;

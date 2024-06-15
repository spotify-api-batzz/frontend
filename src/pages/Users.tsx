import Container from "components/layout/Container";
import { User } from "components/users/User";
import React, { useEffect } from "react";
import { useDispatch, useShallowSelector } from "store";
import { fetchAPIRequest } from "store/reducers/common.reducer";
import { Endpoints } from "types";

function Users() {
  const dispatch = useDispatch();
  const users = useShallowSelector((state) => state.common.users.data);

  useEffect(() => {
    dispatch(
      fetchAPIRequest({ operationName: "getUsers", endpoint: Endpoints.users }),
    );
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

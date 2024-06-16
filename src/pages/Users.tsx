import Container from "components/layout/Container";
import React, { useEffect } from "react";
import { useDispatch, useShallowSelector } from "store";
import { fetchAPIRequest } from "store/reducers/common.reducer";
import { Endpoints } from "types";
import Users from "../components/users/Users";

function UsersPage() {
  const dispatch = useDispatch();
  const users = useShallowSelector((state) => state.common.users.data);

  useEffect(() => {
    dispatch(
      fetchAPIRequest({ operationName: "getUsers", endpoint: Endpoints.users }),
    );
  }, [dispatch]);
  console.log(users);

  if (!users?.users?.nodes?.length) {
    return <></>;
  }

  return (
    <Container>
      <Users users={users.users.nodes} />
    </Container>
  );
}

export default UsersPage;

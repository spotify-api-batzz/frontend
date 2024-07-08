import Container from "@src/components/layout/Container";
import { useDispatch, useShallowSelector } from "@src/store";
import { Endpoints } from "@src/types";
import { useEffect } from "react";
import { fetchAPIRequest } from "store/reducers/common.reducer";
import Users from "../components/users/Users";

function UsersPage() {
  const dispatch = useDispatch();
  const users = useShallowSelector((state) => state.common.users.data);

  useEffect(() => {
    dispatch(
      fetchAPIRequest({ operationName: "getUsers", endpoint: Endpoints.users }),
    );
  }, [dispatch]);

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

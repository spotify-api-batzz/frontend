import React, { useEffect } from "react";
import { useDispatch, useSelector } from "store";
import { Endpoints } from "types";
import { fetchAPIRequest } from "store/reducers/common.reducer";

function App() {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.common.songs.data);

  // useEffect(() => {
  //   dispatch(
  //     fetchAPIRequest({
  //       endpoint: Endpoints.songs,
  //     })
  //   );
  // }, [dispatch]);

  console.log(songs);

  return <div></div>;
}

export default App;

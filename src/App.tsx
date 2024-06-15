import React from "react";
import { useDispatch, useSelector } from "store";

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

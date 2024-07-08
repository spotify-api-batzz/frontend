import Container from "@src/components/layout/Container";
import { Song } from "@src/components/songs/Song";
import { useDispatch, useShallowSelector } from "@src/store";
import { Endpoints } from "@src/types";
import { useEffect } from "react";
import { fetchAPIRequest } from "store/reducers/common.reducer";

function App() {
  const dispatch = useDispatch();
  const songs = useShallowSelector((state) => state.common.songs.data);

  useEffect(() => {
    dispatch(
      fetchAPIRequest({
        operationName: "getAllSongs",
        endpoint: Endpoints.songs,
      }),
    );
  }, [dispatch]);

  return (
    <Container>
      {songs?.songs?.nodes.map(({ id, name, artist, album }) => (
        <Song key={id} name={name} artist={artist} album={album} />
      ))}
    </Container>
  );
}

export default App;

import Container from "components/layout/Container";
import { Song } from "components/songs/Song";
import React, { useEffect } from "react";
import { useDispatch, useShallowSelector } from "store";
import { fetchAPIRequest } from "store/reducers/common.reducer";
import { Endpoints } from "types";

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

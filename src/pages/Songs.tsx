import React, { useEffect } from "react";
import { useDispatch, useSelector, useShallowSelector } from "store";
import { Endpoints } from "types";
import { fetchAPIRequest } from "store/reducers/common.reducer";
import { Song } from "components/songs/Song";
import { getAllSongs } from "graphql/songs";
import Container from "components/layout/Container";

function App() {
  const dispatch = useDispatch();
  const songs = useShallowSelector((state) => state.common.songs.data);

  useEffect(() => {
    dispatch(
      fetchAPIRequest({ query: getAllSongs(), endpoint: Endpoints.songs })
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

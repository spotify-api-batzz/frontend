import React, { useEffect } from "react";
import { useDispatch, useSelector } from "store";
import { Endpoints } from "types";
import { fetchAPIRequest } from "store/reducers/common.reducer";
import { Song } from "components/songs/Song";
import { getAllSongs } from "graphql/songs";
import Container from "components/layout/Container";

function App() {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.common.songs.data);

  useEffect(() => {
    dispatch(
      fetchAPIRequest({ query: getAllSongs(), endpoint: Endpoints.songs })
    );
  }, [dispatch]);

  return (
    <Container>
      {songs?.allSongs?.nodes.map(
        ({ id, name, artistByArtistId, albumByAlbumId }) => (
          <Song
            key={id}
            name={name}
            artist={artistByArtistId}
            album={albumByAlbumId}
          />
        )
      )}
    </Container>
  );
}

export default App;

import { smallestThumbnail } from "helpers/api";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Album, Artist, ThumbnailNode } from "../../types";

interface SongProps {
  name: string;
  album?: Album;
  artist?: Artist;
}

export const SongDiv = styled.div`
  display: flex;
  height: 60px;
  margin: 0 0 25px 0;
  h1 {
    font-size: 16px;
    margin: 0;
    padding: 5px 0 5px 0;
  }
`;

export const SongInformationDiv = styled.div`
  margin: 0 0 0 20px;
  p {
    padding: 0;
    margin: 0;
    font-size: 13px;
  }
`;

export const SongImageWrapperDiv = styled.div`
  min-width: 90px;
  display: flex;
  img {
    margin: auto;
    max-height: 100%;
  }
`;

export const Song = ({ name, album, artist }: SongProps) => {
  const [thumbnail, setThumbnail] = useState<ThumbnailNode | undefined>(
    undefined,
  );

  useEffect(() => {
    if (album?.thumbnails) {
      setThumbnail(smallestThumbnail(album?.thumbnails.nodes));
    }
  }, [album?.thumbnails]);

  return (
    <SongDiv>
      {thumbnail && (
        <SongImageWrapperDiv>
          <img src={thumbnail.url} alt="song thumbnail" />
        </SongImageWrapperDiv>
      )}
      <SongInformationDiv>
        <h1>{name}</h1>
        {album && <p>{album?.name}</p>}
      </SongInformationDiv>
    </SongDiv>
  );
};

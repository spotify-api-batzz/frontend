import {
  SongDiv,
  SongImageWrapperDiv,
  SongInformationDiv,
} from "components/songs/Song";
import { AlbumByAlbumId, ArtistByArtistId, ThumbnailNode } from "graphql/types";
import { smallestThumbnail } from "helpers/api";
import { useEffect, useState } from "react";

interface RecentListenProps {
  name: string;
  diff: string;
  album?: AlbumByAlbumId;
  artist?: ArtistByArtistId;
}

const RecentListen = ({ name, diff, album, artist }: RecentListenProps) => {
  const [thumbnail, setThumbnail] = useState<ThumbnailNode | undefined>(
    undefined
  );

  useEffect(() => {
    if (album?.thumbnails) {
      setThumbnail(smallestThumbnail(album?.thumbnails.nodes));
    }
  }, [album]);

  return (
    <SongDiv>
      {thumbnail && (
        <SongImageWrapperDiv>
          <img src={thumbnail.url} />
        </SongImageWrapperDiv>
      )}
      <SongInformationDiv>
        <h1>{name}</h1>
        {album && <p>{album?.name}</p>}
      </SongInformationDiv>
    </SongDiv>
  );
};

export default RecentListen;

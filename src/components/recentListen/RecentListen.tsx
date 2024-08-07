import {
  SongDiv,
  SongImageWrapperDiv,
  SongInformationDiv,
} from "@src/components/songs/Song";
import { smallestThumbnail } from "helpers/api";
import { useEffect, useState } from "react";
import { Album, Artist, ThumbnailNode } from "../../types";

interface RecentListenProps {
  name: string;
  diff: number;
  album?: Album;
  artist?: Artist;
}

const RecentListen = ({ name, diff, album, artist }: RecentListenProps) => {
  const [thumbnail, setThumbnail] = useState<ThumbnailNode | undefined>(
    undefined,
  );

  useEffect(() => {
    if (album?.thumbnails) {
      setThumbnail(smallestThumbnail(album?.thumbnails.nodes));
    }
  }, [album]);

  const prettyString = (diff: number) => {
    const days = diff < 24 ? `` : `${Math.floor(diff / 24)} day(s) `;
    const hours = days === "" ? `${diff} hours` : `and ${diff % 24} hours ago`;
    return days + hours;
  };

  return (
    <SongDiv>
      {thumbnail && (
        <SongImageWrapperDiv>
          <img src={thumbnail.url} alt="song thumbnail" />
        </SongImageWrapperDiv>
      )}
      <SongInformationDiv>
        <h1>
          {name} ({prettyString(diff)})
        </h1>
        {album && <p>{album?.name}</p>}
      </SongInformationDiv>
    </SongDiv>
  );
};

export default RecentListen;

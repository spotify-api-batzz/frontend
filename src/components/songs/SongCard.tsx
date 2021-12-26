import Tooltip from "components/helpers/Tooltip";
import React from "react";
import styled from "styled-components";

interface SongCardProps {
  x: number;
  y: number;
  name: string;
  album?: string;
  artist?: string;
}

const SongCardDiv = styled.div.attrs<Pick<SongCardProps, "x" | "y">>(
  (props) => ({
    style: {
      top: props.y + 5,
      left: props.x + 5,
    },
  })
)<Pick<SongCardProps, "x" | "y">>`
  position: fixed;
  background-color: #fff;
  padding: 8px;
  h1 {
    margin: 0;
    font-size: 16px;
    font-weight: 400;
  }
  h2 {
    margin: 0;
    font-size: 14px;
  }
`;

const SongCard = ({ x, y, name, album, artist }: SongCardProps) => {
  return (
    <SongCardDiv x={x} y={y}>
      <h1>{name}</h1>
      {album && <h2>{album}</h2>}
      {artist && <h2>{artist}</h2>}
    </SongCardDiv>
  );
};

export default SongCard;

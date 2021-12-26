import Tooltip from "components/helpers/Tooltip";
import React from "react";
import styled from "styled-components";

interface ArtistCardProps {
  x: number;
  y: number;
  name: string;
}

const ArtistCardDiv = styled.div.attrs<Pick<ArtistCardProps, "x" | "y">>(
  (props) => ({
    style: {
      top: props.y + 5,
      left: props.x + 5,
    },
  })
)<Pick<ArtistCardProps, "x" | "y">>`
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

const ArtistCard = ({ x, y, name }: ArtistCardProps) => {
  return (
    <ArtistCardDiv x={x} y={y}>
      <h1>{name}</h1>
    </ArtistCardDiv>
  );
};

export default ArtistCard;

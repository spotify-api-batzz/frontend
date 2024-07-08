import {
  Card as NextCard,
  CardBody,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { Fragment } from "react/jsx-runtime";
import styled from "styled-components";

interface CardProps {
  title: string;
  chunks: React.ReactNode[];
  size: "half" | "third" | "quarter";
}

const CardWrapperDiv = styled.div`
  margin-bottom: 20px;
  padding: 30px 30px 0 0;
  box-sizing: border-box;

  &.half {
    width: 50%;
    min-width: 50%;
  }
  &.third {
    width: 33.3333%;
    min-width: 33.3333%;
  }
  &.quarter {
    width: 25%;
    min-width: 25%;
  }

  @media only screen and (max-width: 1200px) {
    &.half {
      width: 100%;
      min-width: 100%;
    }
  }

  @media only screen and (max-width: 1000px) {
    &.third {
      width: 100%;
      min-width: 100%;
    }
    &.quarter {
      width: 50%;
      min-width: 50%;
    }

    @media only screen and (max-width: 750px) {

      &.quarter {
        width: 100%;
        min-width: 100%;
      }
  }
`;

const Card: React.FC<CardProps> = ({ title, chunks, size }) => (
  <CardWrapperDiv className={size}>
    <NextCard className="max-w-[400px] mb-2.5">
      <CardHeader className="flex gap-3">
        <h1 className="block font-semibold text-gray-900">{title}</h1>
      </CardHeader>
      {chunks.map((chunk, i) => (
        <Fragment key={i}>
          <Divider />
          <CardBody className="flex gap-3 flex-row">{chunk}</CardBody>
        </Fragment>
      ))}
    </NextCard>
  </CardWrapperDiv>
);

export default Card;

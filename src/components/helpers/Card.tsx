import {
  Card as NextCard,
  CardBody,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import styled from "styled-components";

interface CardProps {
  title: string;
  chunks: React.ReactNode[];
  width: string;
}

const HalfCardWrapperDiv = styled.div`
  margin-bottom: 20px;
  padding: 30px 30px 0 0;
  box-sizing: border-box;
`;

const Card: React.FC<CardProps> = ({ title, chunks, width }) => (
  <HalfCardWrapperDiv style={{ width, minWidth: width }}>
    <NextCard className="max-w-[400px] mb-2.5">
      <CardHeader className="flex gap-3">
        <h1 className="block font-semibold text-gray-900">{title}</h1>
      </CardHeader>
      {chunks.map((chunk) => (
        <>
          <Divider />
          <CardBody className="flex gap-3 flex-row">{chunk}</CardBody>
        </>
      ))}
    </NextCard>
  </HalfCardWrapperDiv>
);

export default Card;

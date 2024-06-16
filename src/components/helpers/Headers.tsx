import styled from "styled-components";

const H1Div = styled.h1`
  font-size: 22px;
`;

interface HeaderProps {
  children: React.ReactNode;
}

export const H1: React.FC<HeaderProps> = ({ children }) => {
  return <H1Div>{children}</H1Div>;
};

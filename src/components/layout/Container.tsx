import styled from "styled-components";

const ContainerDiv = styled.div`
  width: 90%;
  margin: auto;
`;

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <ContainerDiv>{children}</ContainerDiv>;
};

export default Container;

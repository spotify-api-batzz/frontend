import styled from "styled-components";

const Flex = styled.div<{ flow?: "column" | "row" }>`
  display: flex;
  flex-direction: ${(props) => props.flow ?? "row"};
  flex-wrap: wrap;
`;

export default Flex;

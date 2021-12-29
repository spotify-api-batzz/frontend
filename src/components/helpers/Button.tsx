import styled from "styled-components";

const Button = styled.button`
  width: auto;
  font-size: 12px;
  color: #fff;
  border: 0;
  background-color: #000;
  font-weight: 400;
  padding: 10px;
  text-transform: uppercase;
  transition: background-color 0.5s;
  :hover {
    background-color: #fff;
    color: #000;
    cursor: pointer;
  }
`;

export default Button;

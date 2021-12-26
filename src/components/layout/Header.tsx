import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderWrapperDiv = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  > div {
    width: 90%;
    margin: auto;
    > a {
      text-decoration: none;
      > h1 {
        color: #000;
        text-underline: none;
        margin: 0;
        font-size: 22px;
      }
    }
  }
`;

const Header = () => {
  return (
    <HeaderWrapperDiv>
      <div>
        <Link to={`/`}>
          <h1>Spotify Data</h1>
        </Link>
      </div>
    </HeaderWrapperDiv>
  );
};

export default Header;

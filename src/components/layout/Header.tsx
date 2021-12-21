import styled from "styled-components";

const HeaderWrapperDiv = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  div {
    width: 90%;
    margin: auto;
    h1 {
      margin: 0;
      font-size: 22px;
    }
  }
`;

const Header = () => {
  return (
    <HeaderWrapperDiv>
      <div>
        <h1>Spotify Listening History</h1>
      </div>
    </HeaderWrapperDiv>
  );
};

export default Header;

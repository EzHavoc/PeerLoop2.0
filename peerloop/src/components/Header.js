import React from 'react';
import styled from "styled-components";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import SearchIcon from '@mui/icons-material/Search';
import AccountBoxIcon from '@mui/icons-material/AccountBox'; // Keep AccountBoxIcon
import HelpIcon from '@mui/icons-material/Help';
function Header() {
  return (
    <HeaderContainer>
      {/* Left Section */}
      <HeaderLeft>
        <HeaderAccountBoxIcon />
        <HeaderAccessTimeFilledIcon />
      </HeaderLeft>

      {/* Search Section */}
      <HeaderSearch>
        <SearchIcon />
        <input type="text" placeholder="Search Peer!" />
      </HeaderSearch>
      <HeaderRight>
        <HeaderHelpIcon/>
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;

// Styled Components
const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: end;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--peerloop-color); /* Ensure this is defined in CSS */
  color: black;
`;

const HeaderLeft= styled.div`
  flex: 0.2;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 0px;
  padding-left: 10px;

  > .MuiSvgIcon-root {
    margin-left: 0px;
    margin-right: 50px;
  }
`;

const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  display: flex;
  text-align: center;
  background-color: #9290C3;
  border-radius: 10px;
  padding: 0 50px;
  color: black;
  border: 1px solid gray;

  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: 0;
    color: black;
    flex: 1;
  }
`;
const HeaderRight = styled.div`
flex: 0.3;
display: flex;
align-items: flex-end;
> .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;

const HeaderAccountBoxIcon = styled(AccountBoxIcon)`
  cursor: pointer;
  color:white;
  &.MuiSvgIcon-root {
    font-size: 40px; /* Set your custom size */
  }
  margin-right: 10px;
  :hover {
    opacity: 0.8;
  }
`;
const HeaderAccessTimeFilledIcon = styled(AccessTimeFilledIcon)`
  cursor: pointer;
  color: white;
  &.MuiSvgIcon-root {
    font-size: 40px; /* Set your custom size */
  }
  margin-right: 10px;
  :hover {
    opacity: 0.8;
  }
`;
const HeaderHelpIcon = styled(HelpIcon)`
  cursor: pointer;
  color: white;
  /* Target nested SVG if necessary */
  &.MuiSvgIcon-root {
    font-size: 40px; /* Set your custom size */
  }
  margin-right: 10px;
  :hover {
    opacity: 0.8;
  }
`;

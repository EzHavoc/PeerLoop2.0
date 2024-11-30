import React, { useState } from 'react';
import styled from "styled-components";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import SearchIcon from '@mui/icons-material/Search';
import HelpIcon from '@mui/icons-material/Help';
import { auth } from '../firebase';
import { Avatar } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth'; // Import useAuthState
import Tooltip from '@mui/material/Tooltip'; // Import Tooltip from Material UI

function Header() {
  const [user] = useAuthState(auth); // Use useAuthState to manage authentication state
  const [currentTime, setCurrentTime] = useState('');

  // Function to get current time in 'hh:mm:ss AM/PM' format
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds} ${ampm}`;
    return formattedTime;
  };

  // Handle the click event on the clock icon
  const handleClockClick = () => {
    const time = getCurrentTime();
    setCurrentTime(time); // Update the state with the current time
  };

  return (
    <HeaderContainer>
      {/* Left Section */}
      <HeaderLeft>
        <HeaderAvatar
          onClick={() => auth.signOut()}
          alt={user?.displayName || "User"}
          src={user?.photoURL || ""}
        />
      </HeaderLeft>

      {/* Time Section */}
      <HeaderTime>
        <Tooltip title={currentTime || "Click to see time"}>
          <HeaderAccessTimeFilledIcon onClick={handleClockClick} />
        </Tooltip>
      </HeaderTime>

      {/* Search Section */}
      <HeaderSearch>
        <SearchIcon />
        <input type="text" placeholder="Search Peer!" />
      </HeaderSearch>

      <HeaderRight>
        <HeaderHelpIcon />
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;

// Styled Components (same as in your code)
const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;  /* Aligns items vertically in the center */
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--peerloop-color); /* Ensure this is defined in CSS */
  color: black;
`;

const HeaderLeft = styled.div`
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

const HeaderTime = styled.div`
  flex: 0.2;
  display: flex;
  align-items: center;
  justify-content: center;
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

const HeaderAvatar = styled(Avatar)`
   cursor: pointer;
   margin-right: 5px;
  :hover {
    opacity: 0.8;
  }
`;

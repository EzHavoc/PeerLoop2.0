import React from 'react';
import styled from "styled-components";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'; // Fixed import path
import { useSelector } from 'react-redux';
import {selectRoomId} from "../features/appSlice"
import ChatInput from './ChatInput';

function Chat() {
    const roomId= useSelector(selectRoomId);
  return (
    <ChatContainer>
        <>
      <Header>
        <HeaderLeft>
          <h4>
            <strong>#Room-name</strong>
            <StarBorderOutlinedIcon />
          </h4>
        </HeaderLeft>
        <HeaderRight>
          <p>
            <InfoOutlinedIcon /> Details
          </p>
        </HeaderRight>
      </Header>
      {/* Chat content will go here */}
      <ChatMessages>
        
      </ChatMessages>
      <ChatInput
        //Channel Name
        channelid={roomId}
      />
      </>
    </ChatContainer>
  );
}

export default Chat;

// Styled Components
const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgrey;
  background-color: #f8f9fa; /* Optional for better contrast */
`;

const HeaderLeft = styled.div`
  > h4 {
    display: flex;
    text-transform: lowercase;
    align-items: center;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
    color: #fbc02d; /* Optional color for the star icon */
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: gray;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px;
    font-size: 16px;
    color: #5f6368; /* Optional color for the info icon */
  }
`;

const ChatMessages = styled.div`
  padding: 20px;
`;

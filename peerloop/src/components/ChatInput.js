import React, { useState } from 'react';
import styled from "styled-components";
import { Button } from '@mui/material';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, doc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

function ChatInput({ channelName, channelId }) {
  const auth = getAuth(); // Initialize auth before using it
  const [user] = useAuthState(auth); // Use auth here
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!channelId || input.trim() === "") return;

    try {
      const roomRef = doc(db, 'rooms', channelId);
      const messagesRef = collection(roomRef, 'messages');

      await addDoc(messagesRef, {
        message: input,
        timestamp: serverTimestamp(),
        user: user?.displayName || 'Your Name',
        userImage: user?.photoURL || 'image.png'
      });

      setInput("");
      console.log("Message sent!");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <ChatInputContainer>
      <form onSubmit={sendMessage}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName || 'ROOM'}`}
        />
        <StyledButton type="submit">
          SEND
        </StyledButton>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;

// Styled Components
const ChatInputContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 240px;
  width: calc(100% - 240px);
  background-color: white;
  border-top: 1px solid lightgray;
  padding: 10px;

  > form {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  > form > input {
    flex: 1;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 15px;
    outline: none;
    font-size: 16px;
    margin-right: 10px;
  }
`;

const StyledButton = styled(Button)`
  && {
    background-color: #9290C3;
    color: white;
    text-transform: none;
    padding: 10px 30px;
    border-radius: 5px;
    margin-right: 20px;
    font-weight: bold;
    font-size: 14px;

    &:hover {
      background-color: #49274b;
    }
  }
`;

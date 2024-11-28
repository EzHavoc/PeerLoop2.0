import React, { useState } from 'react';
import styled from "styled-components";
import { Button } from '@mui/material';
import { db } from '../firebase';
import firebase from 'firebase/compat/app';

function ChatInput({ channelName, channelId }) {
    const [input, setInput] = useState("");

    const sendMessage = (e) => {
        e.preventDefault(); // Prevent page refresh on form submission
        if (!channelId) return; // Do nothing if no channelId

        db.collection("rooms")
            .doc(channelId)
            .collection("messages")
            .add({
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: "Kanishk Singh",
                userImage: "https://reactpersonalportfolio-olive.vercel.app/assets/img-B6tjFmrE.jpg",
            });

        setInput(""); // Clear input field after sending
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
  position: fixed; /* Fix the container to the bottom of the chat section */
  bottom: 0;
  left: 240px; /* Adjust to match the sidebar width */
  width: calc(100% - 240px); /* Occupy remaining space beside the sidebar */
  background-color: white; /* Optional: Match your theme */
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
    margin-right: 10px; /* Space between input and button */
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

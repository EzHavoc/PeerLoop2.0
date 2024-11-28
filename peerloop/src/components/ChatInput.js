import React from 'react';
import styled from "styled-components";
import { Button } from '@mui/material'; // Import Button from Material-UI

function ChatInput({ channelName, channelId }) {
    const sendMessage = (e) => {
        e.preventDefault(); // Prevent page refresh on form submission
        if (!channelId) {
            return; // Do nothing if channelId is not provided
        }

        // Logic to send message (e.g., to a database or API) can be added here
        console.log(`Message sent to channel: ${channelName} (${channelId})`);
    };

    return (
        <ChatInputContainer>
            <form>
                <input 
                    placeholder={`Message #${channelName || 'ROOM'}`} 
                />
                <Button hidden type="submit" onClick={sendMessage}>
                    SEND
                </Button>
            </form>
        </ChatInputContainer>
    );
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-top: 1px solid lightgray;
  padding: 10px;

  > form {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  > form > input {
    flex: 1;
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 5px;
    outline: none;
  }

  > form > button {
    display: none; /* Hidden button for form submission */
  }
`;

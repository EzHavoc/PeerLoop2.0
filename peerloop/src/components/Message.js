import React from 'react';
import styled from 'styled-components';

function Message({ message = 'No message provided', timestamp, user = 'Unknown User', userImage }) {
  const defaultImage = './public/user.pnh';

  // Determine the user image URL
  const userImageUrl = userImage || user?.photoURL || defaultImage;

  // Check if timestamp is valid and format it
  let formattedTimestamp = 'Time not available';
  if (timestamp) {
    if (timestamp.seconds) {
      // Firebase Timestamp object
      formattedTimestamp = new Date(timestamp.seconds * 1000).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    } else if (timestamp instanceof Date) {
      // JavaScript Date object
      formattedTimestamp = timestamp.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    }
  }

  return (
    <MessageContainer>
      <UserImage src={userImageUrl} alt={`${user}'s avatar`} />
      <MessageInfo>
        <UserDetails>
          {user}
          <Timestamp>{formattedTimestamp}</Timestamp>
        </UserDetails>
        <MessageText>{message}</MessageText>
      </MessageInfo>
    </MessageContainer>
  );
}

export default Message;

// Styled Components
const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const UserImage = styled.img`
  height: 48px;
  width: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const MessageInfo = styled.div`
  padding-left: 12px;
  display: flex;
  flex-direction: column;
`;

const UserDetails = styled.h4`
  font-size: 14px;
  font-weight: bold;
  margin: 0;
  display: flex;
  align-items: center;
`;

const Timestamp = styled.span`
  color: gray;
  font-weight: 300;
  font-size: 10px;
  margin-left: 8px;
`;

const MessageText = styled.p`
  margin: 4px 0 0;
  font-size: 14px;
  color: #333;
  word-break: break-word;
`;

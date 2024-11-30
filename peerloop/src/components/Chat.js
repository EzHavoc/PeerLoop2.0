import React, { useRef, useState, useEffect } from 'react';
import styled from "styled-components";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'; // Used in UI
import { useSelector } from 'react-redux';
import { selectRoomId } from "../features/appSlice";
import ChatInput from './ChatInput';
import Message from './Message';
import { 
  doc, 
  getDoc, 
  collection, 
  query, 
  orderBy, 
  onSnapshot 
} from "firebase/firestore"; // Only imports used Firestore functions
import { db } from "../firebase"; // Firebase configuration


function Chat() {
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    const fetchRoomData = async () => {
      if (roomId) {
        try {
          const roomRef = doc(db, 'rooms', roomId);
          const roomSnapshot = await getDoc(roomRef);
          
          if (roomSnapshot.exists()) {
            setRoomDetails(roomSnapshot.data());
          }

          // Real-time listener for messages
          const messagesRef = collection(roomRef, 'messages');
          const messagesQuery = query(messagesRef, orderBy('timestamp', 'asc'));
          
          const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
            const messages = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setRoomMessages(messages);
          });

          // Cleanup subscription
          return () => unsubscribe();
        } catch (error) {
          console.error("Error fetching room data:", error);
        }
      }
    };

    fetchRoomData();
  }, [roomId]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [roomMessages]);

  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
        <Header>
          <HeaderLeft>
            <h4>
              <strong>#{roomDetails.name}</strong>
            </h4>
          </HeaderLeft>

          <HeaderRight>
            <p>
              <InfoOutlinedIcon />Details
            </p>
          </HeaderRight>
        </Header>

        <ChatMessages>
          {roomMessages.map((doc) => {
            const { message, timestamp, user, userImage } = doc;

            return (
              <Message
                key={doc.id}
                message={message}
                timestamp={timestamp}
                user={user}
                userImage={userImage}
              />
            );
          })}
          <ChatBottom ref={chatRef} />
        </ChatMessages>

        <ChatInput
          chatRef={chatRef}
          channelName={roomDetails.name}
          channelId={roomId}
        />
      
      </>
        )}
    </ChatContainer>
  );
}

export default Chat;

const ChatBottom = styled.div`
  height: 0;
  margin-bottom: 20px;
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100vh; 
  margin-top: 60px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgrey;
  background-color: #f8f9fa;
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
    color: #fbc02d;
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
    color: #5f6368;
  }
`;

const ChatMessages = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 190px);
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
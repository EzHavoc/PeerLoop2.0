import React from 'react';
import styled from 'styled-components';
import {db} from "../firebase";
import { collection, addDoc } from "firebase/firestore";
function SideBarOption({ Icon, title, addChannelOption}) { // Use consistent "title"
    const addChannel = async () => {
        const channelName = prompt("Please enter the channel name!");
      
        if (channelName) {
          try {
            // Reference the 'rooms' collection
            const roomsCollection = collection(db, "rooms");
      
            // Add a new channel
            const docRef = await addDoc(roomsCollection, {
              name: channelName,
            });
      
            console.log("Channel added with ID:", docRef.id);
          } catch (error) {
            console.error("Error adding channel:", error);
          }
        } else {
          console.log("Channel name is required!");
        }
      };
      
      const selectChannel = (channelId) => {
        // Logic for handling channel selection
        if (channelId) {
          console.log(`Channel selected with ID: ${channelId}`);
          // Add additional code to navigate to the channel or display its content
        } else {
          console.error("Invalid channel ID.");
        }
      };
  return (
    <SideBarOptionContainer
    onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SideBarOptionChannel>
          <span>#</span> {title}
        </SideBarOptionChannel>
      )}
    </SideBarOptionContainer>
  );
}

export default SideBarOption;

const SideBarOptionContainer = styled.div`
 display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;
  :hover{
    opacity: 0.9;
    background-color: #340e36;
  }
  > h3{
    font-weight: 500;
  }
  >h3>span{
    padding: 15px;
  }

  > .MuiSvgIcon-root {
    margin-right: 10px;
  }
`;

const SideBarOptionChannel = styled.div`
  padding: 10px 0;
  font-weight: 300;
`;

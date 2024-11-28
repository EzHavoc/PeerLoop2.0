import React from 'react';
import { useDispatch } from "react-redux";
import styled from 'styled-components';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { enterRoom } from "../features/appSlice";

function SideBarOption({ Icon, title, addChannelOption, id }) {
  const dispatch = useDispatch();

  const addChannel = async () => {
    const channelName = prompt("Please enter the channel name!");

    if (channelName) {
      try {
        const collectionRef = collection(db, "rooms");
        await addDoc(collectionRef, { name: channelName });
        console.log("Channel added successfully!");
      } catch (error) {
        console.error("Error adding channel: ", error);
      }
    } else {
      console.log("Channel name is required!");
    }
  };

  const selectChannel = (channelId) => {
    if (channelId) {
      dispatch(
        enterRoom({
          roomId: channelId,
        })
      );
    }
  };

  return (
    <SideBarOptionContainer
      onClick={addChannelOption ? addChannel : () => selectChannel(id)}
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

  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }

  > h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding: 15px;
  }

  > .MuiSvgIcon-root {
    margin-right: 10px;
  }
`;

const SideBarOptionChannel = styled.h3`
  padding: 10px 10px;
  font-weight: 700;
`;

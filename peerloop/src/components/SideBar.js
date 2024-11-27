import React from 'react';
import styled from "styled-components";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from "@mui/icons-material/Create";
import CommentIcon from '@mui/icons-material/Comment';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from "@mui/icons-material/Add";
import SideBarOption from './SideBarOption';
import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";

const SideBar = () => {
  const [channels, loading, error] = useCollection(collection(db, "rooms"));

  if (loading) {
    return <p>Loading channels...</p>;
  }

  if (error) {
    return <p>Error loading channels: {error.message}</p>;
  }

  return (
    <SideBarContainer>
      <SideBarHeader>
        <SideBarInfo>
          <h2>PEERLOOP</h2>
          <h3>
            <FiberManualRecordIcon />
            KANISHK SINGH
          </h3>
        </SideBarInfo>
        <CreateIcon />
      </SideBarHeader>
      <SideBarOption Icon={CommentIcon} title="Threads" />
      <SideBarOption Icon={AllInboxIcon} title="Mentions & Reactions" />
      <SideBarOption Icon={DraftsIcon} title="Saved Items" />
      <SideBarOption Icon={BookmarkBorderIcon} title="Channel Browser" />
      <SideBarOption Icon={PeopleAltIcon} title="People & User Group" />
      <SideBarOption Icon={AppsIcon} title="Apps" />
      <SideBarOption Icon={FileOpenIcon} title="File Browser" />
      <SideBarOption Icon={ExpandLessIcon} title="Show Less" />
      <hr />
      <SideBarOption Icon={ExpandMoreIcon} title="Show More" />
      <hr />
      <SideBarOption Icon={AddIcon} addChannelOption title="Add Channel" />
      {channels?.docs.map((doc) => (
        <SideBarOption
          key={doc.id}
          id={doc.id}
          title={doc.data().name}
        />
      ))}
    </SideBarContainer>
  );
};

export default SideBar;

const SideBarContainer = styled.div`
  background-color: var(--peerloop-bar);
  height: 100vh;
  flex: 0.4;
  color: whitesmoke;
  border-top: 0px solid #49274b;
  max-width: 200px;
  margin-top: 60px;
  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
`;

const SideBarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid var(--peerloop-color);
  padding: 13px;
  > .MuiSvgIcon-root {
    padding: 8px;
    color: white;
    font-size: 18px;
    background-color: black;
    border-radius: 999px;
  }
`;

const SideBarInfo = styled.div`
  flex: 1;
  > h2 {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 5px;
  }
  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }
  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: #57a6a1;
  }
`;
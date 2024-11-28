import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Chat from "./components/Chat"; // Import your Chat component
import styled from 'styled-components';

function App() {
  return (
    <div className="app">
      <Router>
        <Header /> {/* Always visible */}
        <AppBody>
          <SideBar /> {/* Always visible */}
          <Routes>
            {/* Define routes as needed */}
            <Route path="/" element={<Chat />} /> {/* Chat is displayed on the root path */}
            <Route path="/chat" element={<Chat />} /> {/* Example route for the chat */}
          </Routes>
        </AppBody>
      </Router>
    </div>
  );
}

export default App;

// Styled Components for layout
const AppBody = styled.div`
  display: flex;
  height: 100vh; /* Takes up remaining space below the header */
`;

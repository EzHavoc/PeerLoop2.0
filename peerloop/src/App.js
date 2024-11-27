import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import styled from 'styled-components';

function App() {
  return (
    <div className="app">
      <Router>
        <Header /> {/* Always visible */}
        <AppBody>
          <SideBar /> {/* Always visible */}
          <Routes>
            <Route path="/" element={ <></> }/>
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

import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';


function Login() {
  const signIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, provider);
      alert('Successfully signed in!');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <LoginContainer>
      <LoginInnerContainer>
      <img src="/PeerLoopLogo.png" alt="PeerLoop Logo" width="150" height="150" />


        <h1>Sign in to PeerLoop!</h1>
        <p>Your Networking Haven!</p>

        <Button onClick={signIn} variant="contained" color="primary">
          Sign in with Google
        </Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
}

export default Login;

// Styled Components
const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  > img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }

  > button {
    margin-top: 50px;
    text-transform: inherit !important;
    background-color: #0a8d48 !important;
    color: white;
  }
`;

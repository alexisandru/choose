import React from 'react'
import styled from 'styled-components'

import {ReactComponent as Google} from '../assets/google.svg'

const Login = () => {
  return (
    <Container>
      <Title>Choose</Title>
      <LoginButton>
        <GoogleIcon />
        Login with Google
      </LoginButton>
    </Container>
  )
}

export default Login


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
  flex-direction: column;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.03);
`

const Title = styled.h1`
  font-family: 'Dancing Script', cursive;
  font-weight: bold;
  
  font-size: 7em;
`

const LoginButton = styled.button`
  display: flex;
  align-items: center;

  background-color: rgb(255, 255, 255);
  border: 1px solid rgba(0,0,0,0.3);
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1em;

  margin-top: 100px;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    cursor: pointer;
  }
`


const GoogleIcon = styled(Google)`
  width: 20px;
  height: auto;
  margin-right: 10px;
`



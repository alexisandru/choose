import React from 'react'
import styled from 'styled-components'

import {ReactComponent as Google} from '../assets/google.svg'

import {auth, googleProvider} from '../firebase.js'
import {signInWithRedirect} from 'firebase/auth'

import {addUser} from '../features/usersFeature.js'
import {useDispatch} from 'react-redux'

const Login = () => {
  const dispatch = useDispatch()

  const showLogin = async () => {
    try {
      await signInWithRedirect(auth, googleProvider)
        .then(result => dispatch(addUser(result.user)))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Title>Choose</Title>
      <LoginButton onClick={() => showLogin()}>
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
`

const Title = styled.h1`
  font-family: 'Dancing Script', cursive;
  font-weight: bold;
  font-size: 7em;
  color: ${props => props.theme.color};
  @media screen and (max-width: 400px) {
    font-weight: 500;
  }
`

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.color};
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1em;
  margin-top: 100px;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => props.theme.primary};

  &:hover {
    filter: brightness(95%);
    cursor: pointer;
  }
`


const GoogleIcon = styled(Google)`
  width: 20px;
  height: auto;
  margin-right: 10px;

  & > g {


    & > g {

    fill: ${props => props.theme.icon};
  }
  }


`



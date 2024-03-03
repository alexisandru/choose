import React from 'react'
import styled, {keyframes} from 'styled-components'

const Loader = () => {
  return (
    <Container>
      <Spinner></Spinner>
      <Spinner></Spinner>
      <Spinner></Spinner>
      <Spinner></Spinner>
    </Container>
  )
}

export default Loader

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 255, 255);
`

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid rgb(41, 41, 41);
  border-radius: 50%;
  animation: ${rotate}  1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: rgb(41, 41, 41) transparent transparent transparent;

  &:nth-child(1) {
    animation-delay: -0.45s;
  }

  &:nth-child(2) {
    animation-delay: -0.3s;
  }

  &:nth-child(3) {
    animation-delay: -0.15s;
  }
`





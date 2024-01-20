import React from 'react'
import styled from 'styled-components'

const Navbar = () => {
  return (
    <Container>
      <a href="#!">Choose</a>
      <a href="#!">Alexis</a>
    </Container>
  )
}

export default Navbar

const Container = styled.div`
  background-color: rgba(0,0,0,0.2);
  display: flex;
  justify-content: space-between;

  padding: 10px 20px;
`


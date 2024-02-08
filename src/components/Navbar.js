import React from 'react'
import styled from 'styled-components'

const Navbar = () => {
  return (
    <Container>
      <Title href="#!">Choose</Title>
      <a href="#!">Alexis</a>
    </Container>
  )
}

export default Navbar

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 10px 30px;
`

const Title = styled.a`
  font-family: 'Dancing Script', cursive;
  font-weight: bold;
  text-decoration: none;
  font-size: 2.5em;
  color: rgba(0,0,0,0.9);

`



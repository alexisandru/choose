import React from 'react'
import styled from 'styled-components'

import Navbar from './Navbar.js'
import Feed from './Feed.js'
import Profile from './Profile.js'

const Main = () => {
  return (
    <Container>
      <Navbar />
      <Profile />
    </Container>
  )
}

export default Main

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

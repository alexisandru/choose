import React from 'react'
import styled from 'styled-components'

import Navbar from './Navbar.js'


import {Outlet} from 'react-router-dom'

const Main = () => {
  return (
    <Container>
      <Navbar />
      <Outlet />
    </Container>
  )
}


export default Main

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`

import React, {useEffect} from 'react'
import styled from 'styled-components'

import Navbar from './Navbar.js'

import {Outlet} from 'react-router-dom'

import {listenerPostsFirestore} from '../features/thunks.js'
import {useDispatch} from 'react-redux'

const Main = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = dispatch(listenerPostsFirestore())

    return () => unsubscribe()

  }, [dispatch])

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

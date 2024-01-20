import React from 'react'
import styled from 'styled-components'

import CreatePost from './CreatePost.js'
import Post from './Post.js'


const Feed = () => {
  return (
    <Container>
      <CreatePost />
      <Post />
      <Post />
      <Post />
    </Container>
  )
}

export default Feed

const Container = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;
  flex-direction: column;
`

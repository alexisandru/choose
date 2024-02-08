import React from 'react'
import styled from 'styled-components'

import CreatePost from './CreatePost.js'
import Post from './Post.js'

import {useSelector} from 'react-redux'

const Feed = () => {

  const posts = useSelector(state => state.posts)


  return (
    <Container>
      <CreatePost />
      {posts.map(data => <Post key={data.id} post={data} />)}
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

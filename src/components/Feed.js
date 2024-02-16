import React, {useState} from 'react'
import styled from 'styled-components'

import CreatePost from './CreatePost.js'
import Post from './Post.js'

import {useSelector} from 'react-redux'

const Feed = () => {
  const [sectionActived, setSectionActived] = useState(1)

  const posts = useSelector(state => state.posts)
  const currentUser = useSelector(state => state.users.actual_user)
  const following = useSelector(state => state.users.users).find(user => user.id === currentUser).following



  const postsToShow = () => {
    if (sectionActived === 1) {
      return posts
    } else if (sectionActived === 2) {
      return posts.filter(post => following.includes(post.user_id))
    }
  }


  return (
    <Container>
      <CreatePost />

      <Sections>
        <Section active={sectionActived === 1} onClick={() => setSectionActived(1)} >Posts</Section>
        <Section active={sectionActived === 2} onClick={() => setSectionActived(2)} >Following</Section>
      </Sections>

      {postsToShow().map(data => <Post key={data.id} post={data} />)}
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


const Sections = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid rgba(0,0,0,0.2);
  
  @media screen and (max-width: 400px) {
    width: 95%;
  }
`

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: 15px 0;
  cursor: pointer;

  border-bottom: ${props => props.active ? '2px solid rgba(56, 23, 122, 0.8)' : '2px solid rgb(255, 255, 255)'};

  &:hover{
    border-bottom: ${props => props.active ? '2px solid rgba(56, 23, 122, 0.8)' : '2px solid rgba(56, 23, 122, 0.3)'};
  }
`

import React, {useState} from 'react'
import styled from 'styled-components'

import Post from './Post.js'

import {useSelector} from 'react-redux'

import {ReactComponent as Ok} from '../assets/ok.svg'
import {ReactComponent as Close} from '../assets/close.svg'


const Profile = () => {

  const [followed, setFollowed] = useState(true)
  const [sectionActived, setSectionActived] = useState(1)

  const user = useSelector(state => state.users).find(user => user.id === 1)
  const posts = useSelector(state => state.posts)

  const changeSection = (id) => {
    setSectionActived(id)
  }

  const postsToShow = () => {
    if (sectionActived === 1) {
      return posts.filter(post => post.user_id === user.id)
    } else if (sectionActived === 2) {
      const likesPosts = user.likes.map(like => posts.find(post => post.id === like))
      return likesPosts
    } else if (sectionActived === 3) {
      const dislikesPosts = user.dislikes.map(dislike => posts.find(post => post.id === dislike))
      return dislikesPosts
    }
  }

  return (
    <Container>
      <Header>
        <Username>{user.name}</Username>

        <InfoUser>
          <FollowersCount>Followers: {user.followers.length}</FollowersCount>
          <FollowingCount>Following: {user.following.length}</FollowingCount>
        </InfoUser>

        {followed
          ? <FollowBtn>Follow <OkIcon /></FollowBtn>
          : <UnfollowBtn>Unfollow <CloseIcon /></UnfollowBtn>
        }

      </Header>

      <Sections>
        <Section active={sectionActived === 1} onClick={() => changeSection(1)} >Posts</Section>
        <Section active={sectionActived === 2} onClick={() => changeSection(2)} >Likes</Section>
        <Section active={sectionActived === 3} onClick={() => changeSection(3)}>Dislikes</Section>
      </Sections>

      {postsToShow().map(data => <Post key={data.id} post={data} />)}

    </Container >
  )
}

export default Profile

const Sections = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid rgba(0,0,0,0.2);
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0 20px 0;
`

const Username = styled.h1`
  margin-bottom: 20px;
  font-size: 3em;
  color: rgba(0,0,0,0.9);
`

const InfoUser = styled.div`
  display: flex;
  font-size: 0.9em;
`

const FollowersCount = styled.p`
  color: rgba(0,0,0,0.7);
  margin-right: 10px;
`

const FollowingCount = styled.p`
  color: rgba(0,0,0,0.7);
`

const FollowBtn = styled.button`
  background-color:rgba(56, 23, 122, 0.8);
  color: rgb(255, 255, 255);
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid rgba(56, 23, 122, 0.8);
  cursor: pointer;

  display: flex;
  align-items: center;

  &:hover {
    background-color: rgba(56, 23, 122, 0.9);
  }
`

const UnfollowBtn = styled(FollowBtn)`
  background-color:rgba(222, 29, 29, 0.9);
  border: 1px solid rgba(222, 29, 29, 0.9); 

  &:hover {
    background-color: rgba(222, 29, 29, 1);
  }
`

const OkIcon = styled(Ok)`
  width: 15px;
  height: auto;
  margin-left: 5px;
  fill: rgb(255, 255, 255);
  & > path {
    stroke: rgb(255, 255, 255);
  }
`


const CloseIcon = styled(Close)`
  width: 15px;
  height: auto;
  margin-left: 5px;
  fill: rgb(255, 255, 255);
  & > path {
    stroke: rgb(255, 255, 255);
  }
`

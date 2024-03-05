import React, {useState} from 'react'
import styled from 'styled-components'

import Post from './Post.js'
import ModalFollowers from './ModalFollowers.js'

import {useSelector, useDispatch} from 'react-redux'

import {ReactComponent as Ok} from '../assets/ok.svg'
import {ReactComponent as Close} from '../assets/close.svg'

import {addFollower, addFollowing, deleteFollower, deleteFollowing} from '../features/usersFeature.js'
import {addFollowerFirestore, addFollowingFirestore, deleteFollowerFirestore, deleteFollowingFirestore} from '../features/thunks.js'

import {useParams} from 'react-router-dom'

const Profile = () => {
  const dispatch = useDispatch()
  const {id} = useParams()

  const [sectionActived, setSectionActived] = useState(1)
  const [sectionModal, setSectionModal] = useState(1)
  const [openModal, setOpenModal] = useState(false)

  const user = useSelector(state => state.users.users).find(user => `${user.id}` === id)
  const currentUser = useSelector(state => state.users.actual_user)
  const posts = useSelector(state => state.posts)

  const followButtons = user.followers.includes(currentUser)
    ? <UnfollowBtn onClick={() => unfollowActions()}>Unfollow <CloseIcon /></UnfollowBtn>
    : <FollowBtn onClick={() => followActions()}>Follow <OkIcon /></FollowBtn>

  const isTheSame = user.id !== currentUser

  const postsToShow = () => {
    if (sectionActived === 1) {
      return posts.filter(post => post.user_id === user.id)
    } else if (sectionActived === 2) {
      return user.likes.map(like => posts.find(post => post.id === like))
    } else if (sectionActived === 3) {
      return user.dislikes.map(dislike => posts.find(post => post.id === dislike))
    }
  }

  const followActions = () => {
    dispatch(addFollower(user.id))
    dispatch(addFollowing(user.id))
    dispatch(addFollowerFirestore(user.id))
    dispatch(addFollowingFirestore(user.id))
  }

  const unfollowActions = () => {
    dispatch(deleteFollower(user.id))
    dispatch(deleteFollowing(user.id))
    dispatch(deleteFollowerFirestore(user.id))
    dispatch(deleteFollowingFirestore(user.id))
  }

  const handleModal = (section) => {
    setSectionModal(section)
    setOpenModal(prev => !prev)
  }

  return (
    <Container>
      <Header>
        <Username>{user.name}</Username>

        {openModal && <ModalFollowers user={user} section={sectionModal} open={openModal} close={() => setOpenModal(false)} />}

        <InfoUser>
          <FollowersCount onClick={() => handleModal(1)}>Followers: {user.followers.length}</FollowersCount>
          <FollowingCount onClick={() => handleModal(2)}>Following: {user.following.length}</FollowingCount>
        </InfoUser>

        {isTheSame && followButtons}

      </Header>

      <Sections>
        <Section $active={sectionActived === 1} onClick={() => setSectionActived(1)} >Posts</Section>
        <Section $active={sectionActived === 2} onClick={() => setSectionActived(2)} >Likes</Section>
        <Section $active={sectionActived === 3} onClick={() => setSectionActived(3)}>Dislikes</Section>
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
  border-bottom: ${props => props.$active ? `2px solid ${props.theme.primary}` : `2px solid ${props.theme.body}`};

  &:hover{
    border-bottom: ${props => props.$active ? `2px solid ${props.theme.primary}` : `2px solid ${props.theme.border_options}`};
  }

  color: ${props => props.theme.color};
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
  color: ${props => props.theme.color};

  @media screen and (max-width: 400px) {
    text-align: center;
    font-size: 2em;
  }

`

const InfoUser = styled.div`
  display: flex;
  font-size: 0.9em;
`

const FollowersCount = styled.p`
  color: ${props => props.theme.color};
  margin-right: 10px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const FollowingCount = styled.p`
  color: ${props => props.theme.color};
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const FollowBtn = styled.button`
  background-color:rgba(56, 23, 122, 0.8);
  color: ${props => props.theme.color};
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
  fill: ${props => props.theme.icon};
  & > path {
    stroke: ${props => props.theme.icon};
  }
`


const CloseIcon = styled(Close)`
  width: 15px;
  height: auto;
  margin-left: 5px;
  fill: ${props => props.theme.icon};
  & > path {
    stroke: ${props => props.theme.icon};
  }
`

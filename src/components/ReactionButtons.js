import React from 'react'
import styled from 'styled-components'

import {useSelector, useDispatch} from 'react-redux'
import {addUserActionsToPostFirestore, addReactionUserToFirestore} from '../features/thunks'

import {ReactComponent as Dislike} from '../assets/dislike.svg'
import {ReactComponent as Like} from '../assets/like.svg'

import {addLike, addDislike} from '../features/postsFeature.js'
import {addLikeUser, addDislikeUser} from '../features/usersFeature.js'

const ReactionButtons = ({id_user, id_post}) => {
  const dispatch = useDispatch()
  const post = useSelector(state => state.posts).find(post => post.id === id_post)

  const likeBehavior = () => {
    dispatch(addLike({id_post, id_user}))
    dispatch(addLikeUser({id_post, id_user}))
    dispatch(addUserActionsToPostFirestore({id: id_post}))
    dispatch(addReactionUserToFirestore({id: id_user}))
  }

  const dislikeBehavior = () => {
    dispatch(addDislike({id_post, id_user}))
    dispatch(addDislikeUser({id_post, id_user}))
    dispatch(addUserActionsToPostFirestore({id: id_post}))
    dispatch(addReactionUserToFirestore({id: id_user}))
  }

  return (
    <Container>
      <Button onClick={() => likeBehavior()}>
        <LikeIcon $active={post.likes.includes(id_user)} />
        {post.likes.length}
      </Button>
      <Button onClick={() => dislikeBehavior()}>
        <DislikeIcon $active={post.dislikes.includes(id_user)} />
        {post.dislikes.length}
      </Button>
    </Container>

  )
}

export default ReactionButtons

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 5px;
`

const Button = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
`


const LikeIcon = styled(Like)`
  width: 23px;
  height: auto;
  margin-right: 5px;
  fill: ${props => props.$active ? props.theme.primary : ''};
  &> path {
 //   stroke: ${props => props.theme.surface};
    stroke: ${props => props.$active ? props.theme.surface : props.theme.icon};
  }
`

const DislikeIcon = styled(Dislike)`
width: 23px;
  height: auto;
  margin-right: 5px;
fill: ${props => props.$active ? props.theme.error : ''};
  &> path {
    stroke: ${props => props.$active ? props.theme.surface : props.theme.icon};
}
` 

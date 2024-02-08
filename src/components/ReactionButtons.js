import React from 'react'
import styled from 'styled-components'

import {useSelector, useDispatch} from 'react-redux'

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
  }

  const dislikeBehavior = () => {
    dispatch(addDislike({id_post, id_user}))
    dispatch(addDislikeUser({id_post, id_user}))
  }

  return (
    <Container>
      <Button onClick={() => likeBehavior()}>
        <LikeIcon active={post.likes.includes(id_user)} />
        {post.likes.length}
      </Button>
      <Button onClick={() => dislikeBehavior()}>
        <DislikeIcon active={post.dislikes.includes(id_user)} />
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
  fill: ${props => props.active ? 'rgba(56, 23, 122, 0.5)' : ''};
    &> path {
    stroke: ${props => props.active ? 'rgba(56, 23, 122, 0.6)' : ''};
  }
`

const DislikeIcon = styled(Dislike)`
  width: 23px;
  height: auto;
  fill: ${props => props.active ? 'rgba(168, 50, 50, 0.6)' : ''};
  &>  path {
    stroke: ${props => props.active ? 'rgba(168, 50, 50, 1)' : ''};
  }
` 

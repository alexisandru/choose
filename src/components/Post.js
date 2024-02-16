import React from 'react'
import styled from 'styled-components'

import {useSelector, useDispatch} from 'react-redux'

import {addVotePost} from '../features/postsFeature.js'

import {ReactComponent as Voted} from '../assets/voted.svg'

import ReactionButtons from './ReactionButtons.js'
import OptionsPost from './OptionsPost.js'

import {Link} from 'react-router-dom'

const Post = ({post}) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.users.users).find(user => user.id === post.user_id)
  const currentUser = useSelector(state => state.users.actual_user)

  const voted = post.voters.find(option => option.id_user === currentUser)

  const generateOptions = () => {
    if (voted !== undefined) {
      return post.options.map(option => {
        const percentage = (100 * option.votes) / post.total_votes
        return (
          <OptionVoted
            key={option.id}
            $percentage={percentage}
          >
            {option.description}
            {option.id === voted.id_option ? <VotedIcon /> : <></>}
            <Percentage>{Math.round(percentage)}%</Percentage>
          </OptionVoted>
        )
      })
    } else {
      return post.options.map(option => <Option key={option.id} onClick={() => dispatch(addVotePost({id: post.id, newVote: {id_user: currentUser, id_option: option.id}}))}>{option.description}</Option>)
    }
  }

  const formatDate = () => {
    const date = new Date(post.date)

    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    let hour = date.getHours()
    let minutes = date.getMinutes()

    hour = hour < 10 ? '0' + hour : hour
    minutes = minutes < 10 ? '0' + minutes : minutes

    return <p>{day}/{month + 1}/{year} {hour}:{minutes}</p>
  }

  return (
    <Container>
      <ProfileData>
        <ProfileName>
          <Photo />
          <Name to={`/user/${user.id}`}>{user.name}</Name>
        </ProfileName>
        {user.id === currentUser && <OptionsPost id={post.id} />}
      </ProfileData>

      <Description>
        {post.description}
      </Description>

      <Options>
        {generateOptions()}
      </Options>

      <Info>
        <p>{post.total_votes}</p>
        {formatDate()}
      </Info>

      <ReactionButtons id_user={currentUser} id_post={post.id} />


    </Container>
  )
}

export default Post

const Percentage = styled.span`
  margin-left: auto;
`


const Container = styled.div`
  width: 40%;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 10px;
  padding: 15px 20px;
  margin-top: 15px;
  box-shadow: rgba(0,0,0,0.24) 0px 3px 8px;

  @media screen and (max-width: 400px) {
    width: 95%;
  }
`

const ProfileData = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ProfileName = styled.div`
  display: flex;
  align-items: center;
`

const Photo = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(0,0,0,0.4);
`

const Name = styled(Link)`
  color: rgba(0,0,0,0.8);
  margin-left: 10px;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`
const Description = styled.p`
  margin: 10px 0;
`

const Options = styled.div`

`

const OptionVoted = styled.div`
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 5px;
  margin-top: 5px;
  padding: 5px;
  font-size: 0.9em;

  border: 2px solid rgba(56, 23, 122, 0.5);
  display: flex;
  align-items: center;
  
 background: linear-gradient(to right, rgba(56, 23, 122, 0.2) ${props => props.$percentage}%, rgb(255, 255, 255) 0);
`

const Option = styled.div`
  border-radius: 5px;
  margin-top: 5px;
  padding: 5px;
  font-size: 0.9em;

  border: 2px solid rgba(56, 23, 122, 0.6);

  &:hover {
    border: 2px solid rgb(56, 23, 122);
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.05);
  }
`

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8em;
  margin-top: 10px;
  color: rgba(0, 0, 0, 0.7);
`



const VotedIcon = styled(Voted)`
  width: 15px;
  height: auto;
  margin-left: 10px;
`


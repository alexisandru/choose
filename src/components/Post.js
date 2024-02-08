import React from 'react'
import styled from 'styled-components'

import {useSelector, useDispatch} from 'react-redux'

import {addVotePost} from '../features/postsFeature.js'

import {ReactComponent as Delete} from '../assets/delete.svg'

import ReactionButtons from './ReactionButtons.js'

const Post = ({post}) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.users).find(user => user.id === post.user_id)

  const voted = post.voters.find(option => option.id_user === user.id)

  const generateOptions = () => {
    if (voted !== undefined) {
      return post.options.map(option => {
        const percentage = (100 * option.votes) / post.total_votes
        return <OptionVoted key={option.id} $percentage={percentage}>{option.description}{option.id === voted.id_option ? <VotedSign>&#9745;</VotedSign> : <></>}<Percentage>{Math.round(percentage)}%</Percentage></OptionVoted>
      })
    } else {
      return post.options.map(option => <Option key={option.id} onClick={() => dispatch(addVotePost({id: post.id, newVote: {id_user: user.id, id_option: option.id}}))}>{option.description}</Option>)
    }
  }


  return (
    <Container>
      <Profile>
        <Photo />
        <Name href="!#">{user.name}</Name>
        {user.id === 1 && <DeleteIcon />}
      </Profile>

      <Description>
        {post.description}
      </Description>

      <Options>
        {generateOptions()}
      </Options>

      <Info>
        <p>{post.total_votes}</p>
        <p>{post.date.day}/{post.date.month}/{post.date.year} {post.date.hour}:{post.date.minutes}</p>
      </Info>

      <ReactionButtons id_user={user.id} id_post={post.id} />

    </Container>
  )
}

export default Post

const Percentage = styled.span`
  margin-left: auto;
`

const VotedSign = styled.span`
  margin-left: 10px;
`

const Container = styled.div`
  width: 40%;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 10px;
  padding: 15px 20px;
  margin-top: 10px;
  box-shadow: rgba(0,0,0,0.24) 0px 3px 8px;
`

const Profile = styled.div`
  display: flex;
  align-items: center;
`

const Photo = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(0,0,0,0.4);
`

const Name = styled.a`
  color: rgba(0,0,0,0.8);
  margin-left: 10px;
  font-weight: 500;
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


const DeleteIcon = styled(Delete)`
  width: 20px;
  height: auto;
  margin-left: auto;
`






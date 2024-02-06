import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

import {useSelector} from 'react-redux'

import {ReactComponent as Arrow} from '../assets/arrows.svg'
import {ReactComponent as Heart} from '../assets/heart.svg'

const Post = () => {

  const [post, setPost] = useState(useSelector(state => state.posts[0]))
  const [user, setUser] = useState(useSelector(state => state.users).find(user => user.id === post.user_id))

  const voted = post.voters.find(option => option.id_user === user.id)

  const generateOptions = () => {
    if (voted !== undefined) {
      return post.options.map(option => option.id === voted.id_option ? <OptionVoted>{option.description}&#9745;</OptionVoted>: <OptionVoted>{option.description}</OptionVoted>)
    } else {
      return post.options.map(option => <Option>{option.description}</Option>)
    }
  }


  return (
    <Container>
      <Profile>
        <Photo />
        <Name href="!#">{user.name}</Name>
      </Profile>

      <Description>
        {post.description}
      </Description>

      <Options>
        {generateOptions()}
      </Options>

      <Info>
        <p>{post.total_votes}</p>
        <p>`{post.date.dia}/{post.date.mes}/{post.date.anio} {post.date.hora}:{post.date.min}`</p>
      </Info>

      <Buttons>
        <Button>
          <HeartIcon active={false} />
          Like
        </Button>
        <Button>
          <ArrowIcon active={false} />
          Repost
        </Button>
      </Buttons>

    </Container>
  )
}

export default Post


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

  border: 1px solid #000;
  
  background: linear-gradient(to right, rgba(0,0,0,0.4) 75%, rgb(255,255,255) 0%);
`


const Option = styled.div`
  border-radius: 5px;
  margin-top: 5px;
  padding: 5px;
  font-size: 0.9em;

  border: 2px solid rgba(56, 23, 122, 0.6);

  &:hover {
    border:2px solid rgb(56, 23, 122);
    cursor: pointer;
    background-color: rgba(0,0,0,0.05);
  
  }
`

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8em;
  margin-top: 10px;
  color: rgba(0,0,0,0.7);
`

const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 5px;
`

const Button = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  
`

const HeartIcon = styled(Heart)`
  width: 26px;
  height: auto;
  fill: ${props => props.active ? 'red' : ''};
  &>path {
    stroke: ${props => props.active ? 'red' : ''};
  }
`

const ArrowIcon = styled(Arrow)`
  width: 26px;
  height: auto;
  &>g>path {
    stroke: ${props => props.active ? 'blue' : ''};
  }
`







import React from 'react'
import styled from 'styled-components'

import {ReactComponent as Arrow} from '../assets/arrows.svg'
import {ReactComponent as Heart} from '../assets/heart.svg'

const Post = () => {

  console.log("post")

  return (
    <Container>
      <Profile>
        <Photo />
        <Name href="!#">John Doe</Name>
      </Profile>

      <Description>
        Lorem impsum dolor met.
      </Description>

      <Options>
        <Option>Option n1</Option>
        <Option>Option n2</Option>
      </Options>

      <Info>
        <p>1.000 votos</p>
        <p>19/12/2023 15:00</p>
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

const Option = styled.div`
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 5px;
  margin-top: 5px;
  padding: 5px;
  font-size: 0.9em;
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







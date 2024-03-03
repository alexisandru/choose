import React, {useState} from 'react'
import styled from 'styled-components'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

const ModalFollowers = ({user, open, close, section}) => {
  const [sectionActived, setSectionActived] = useState(section)

  const users = useSelector(state => state.users.users)

  const usersToShow = () => {
    if (sectionActived === 1) {
      return users.filter(userr => user.followers.includes(userr.id))
    } else if (sectionActived === 2) {
      return users.filter(userr => user.following.includes(userr.id))
    }
  }

  return (
    <Container open={open}>
      <ModalContent>
        <Sections>
          <Section active={sectionActived === 1} onClick={() => setSectionActived(1)}>Followers</Section>
          <Section active={sectionActived === 2} onClick={() => setSectionActived(2)}>Following</Section>
        </Sections>

        <Users>
          {
            usersToShow().map(userr => {
              return (
                <User>
                  <Photo />
                  <Name to={`/user/${userr.id}`} onClick={() => close()}>{userr.name}</Name>
                </User>
              )
            })
          }
        </Users>

        <Close onClick={() => close()}>Close</Close>
      </ModalContent>
    </Container >
  )
}

export default ModalFollowers

const Close = styled.button`
  background-color: rgb(255, 255, 255);
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 7px;
  padding: 10px 30px;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: rgba(0,0,0,0.1);
  }
`

const Users = styled.div`
  height: 100%;
  width: 95%;
  overflow: auto;
`

const User = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  align-items: center;
  padding: 15px 5px;
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


const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: ${props => props.open ? 'flex' : 'none'}; 
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  overflow: auto;
  background-color: rgba(0,0,0,0.3);
`

const ModalContent = styled.div`
  background-color: rgb(255, 255, 255);
  width: 40%;
  height: 80%;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 400px) {
    width: 95%;
  }
`
const Sections = styled.div`
  width: 95%;
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

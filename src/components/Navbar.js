import React from 'react'
import styled from 'styled-components'

import {ReactComponent as User} from '../assets/profile.svg'

import {ReactComponent as Profile} from '../assets/profile_circle.svg'
import {ReactComponent as Logout} from '../assets/logout.svg'

const Navbar = () => {
  return (
    <Container>
      <Title href="#!">Choose</Title>
      <Dropdown>
        <DropdownBtn>
          <UserIcon />
          Alexis
        </DropdownBtn>
        <DropdownMenu>
          <DropdownItem><ProfileIcon />Profile</DropdownItem>
          <DropdownItem><LogoutIcon />Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Container>
  )
}

export default Navbar

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
`

const Title = styled.a`
  font-family: 'Dancing Script', cursive;
  font-weight: bold;
  text-decoration: none;
  font-size: 2.5em;
  color: rgba(0,0,0,0.9);
`

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  align-items: center;

`


const DropdownMenu = styled.div`
  display: none;
  position: absolute;
  z-index: 1;
  width: max-content;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  margin-left: -10px;

  ${Dropdown}:hover & {
    display: block;
    box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.3);
  }
`

const DropdownBtn = styled.div`
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;

  ${Dropdown}:hover & {
    background-color: rgba(0, 0, 0, 0.07);  
  }


`


const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 40px 10px 20px;

  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.07);
  }
`


const UserIcon = styled(User)`
  width: 20px;
  height: auto;
  margin-right: 5px;
`

const ProfileIcon = styled(Profile)`
  width: 20px;
  height: auto;
  margin-right: 5px;
`

const LogoutIcon = styled(Logout)`
  width: 20px;
  height: auto;
  margin-right: 5px;
`

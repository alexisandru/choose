import React from 'react'
import styled from 'styled-components'

import {ReactComponent as User} from '../assets/profile.svg'

import {ReactComponent as Profile} from '../assets/profile_circle.svg'
import {ReactComponent as Logout} from '../assets/logout.svg'

import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

const Navbar = () => {
  const currentUser = useSelector(state => state.users.actual_user)

  return (
    <Container>
      <Title to="/">Choose</Title>
      <Dropdown>
        <DropdownBtn>
          <UserIcon />
          Alexis
        </DropdownBtn>
        <DropdownMenu>
          <DropdownItem to={`/user/${currentUser}`}><ProfileIcon />Profile</DropdownItem>
          <DropdownItem><LogoutIcon />Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Container >
  )
}

export default Navbar

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;

  @media screen and (max-width: 400px) {
    padding: 10px 15px;
  }
`

const Title = styled(Link)`
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


  @media screen and (max-width: 400px) {
    right: 0;
  }
`

const DropdownBtn = styled.div`
  cursor: pointer;
  padding: 14px 20px;
  border-radius: 5px;
  display: flex;
  align-self: center;
  justify-content: center;

  ${Dropdown}:hover & {
    background-color: rgba(0, 0, 0, 0.07);  
  }


`


const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 10px 40px 10px 20px;
  text-decoration: none;
  color: rgb(0,0,0);

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

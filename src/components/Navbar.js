import React from 'react'
import styled from 'styled-components'

import {ReactComponent as User} from '../assets/profile.svg'

import {ReactComponent as Profile} from '../assets/profile_circle.svg'
import {ReactComponent as Logout} from '../assets/logout.svg'
import {ReactComponent as Moon} from '../assets/moon.svg'
import {ReactComponent as Sun} from '../assets/sun.svg'

import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {setTheme} from '../features/themeFeature'

//firebase
import {auth} from '../firebase.js'
import {signOut} from 'firebase/auth'

const Navbar = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.users.actual_user)
  const user = useSelector(state => state.users.users).find(user => user.id === currentUser)
  const theme = useSelector(state => state.theme.darkEnabled)

  const logout = async () => {
    await signOut(auth)
  }


  return (
    <Container>
      <Title to="/">Choose</Title>
      <div style={{display: 'flex', alignItems: 'center'}}>
        {theme ? <SunIcon onClick={() => dispatch(setTheme())} /> : <MoonIcon onClick={() => dispatch(setTheme())} />}
        <Dropdown>
          <DropdownBtn>
            <UserIcon />
            {user && user.name.split(" ")[0]}
          </DropdownBtn>
          <DropdownMenu>
            <DropdownItem to={`/user/${currentUser}`}><ProfileIcon />Profile</DropdownItem>
            <DropdownItem onClick={() => logout()}><LogoutIcon />Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
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
  color: ${props => props.theme.color};
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
  background-color: ${props => props.theme.surface};
  border-radius: 5px;
  margin-left: -10px;

  ${Dropdown}:hover & {
    display: block;
    box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.8);
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

  color: ${props => props.theme.color};
  ${Dropdown}:hover & {
    background-color: rgba(0, 0, 0, 0.07);  
  }


`


const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 10px 40px 10px 20px;
  text-decoration: none;
  color: ${props => props.theme.color};

  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.07);
  }
`


const UserIcon = styled(User)`
  width: 20px;
  height: auto;
  margin-right: 5px;
  fill: ${props => props.theme.icon};
  & > path {
    stroke: ${props => props.theme.icon};
  }
`


const MoonIcon = styled(Moon)`
  width: 30px;
  height: auto;
  padding: 3px;
  border-radius: 50%;

  & > path {
    stroke: ${props => props.theme.icon};
  }

  &:hover {
    background-color: rgba(0,0,0,0.1);
    cursor: pointer;
  }
`
const SunIcon = styled(Sun)`
  width: 30px;
  height: auto;
  padding: 3px;
  border-radius: 50%;

  & > path {
    stroke: ${props => props.theme.icon};
  }

  &:hover {
    background-color: rgba(0,0,0,0.1);
    cursor: pointer;
  }
`


const ProfileIcon = styled(Profile)`
  width: 20px;
  height: auto;
  margin-right: 5px;

  & > path {
    stroke: ${props => props.theme.icon};
  }
`

const LogoutIcon = styled(Logout)`
  width: 20px;
  height: auto;
  margin-right: 5px;
  & > path {
    stroke: ${props => props.theme.icon};
  }
`

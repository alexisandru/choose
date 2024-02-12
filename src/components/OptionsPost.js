import React from 'react'
import styled from 'styled-components'

import {useDispatch} from 'react-redux'

import {ReactComponent as Delete} from '../assets/delete.svg'
import {ReactComponent as Options} from '../assets/options.svg'

import {deletePost} from '../features/postsFeature.js'
import {deleteIdInLikesDislikes} from '../features/usersFeature.js'

const OptionsPost = ({id}) => {
  const dispatch = useDispatch()

  const deletePostActions = () => {
    dispatch(deletePost(id))
    dispatch(deleteIdInLikesDislikes(id))
  }

  return (
    <Container>
      <OptionsIcon />
      <Dropdown>
        <DropdownItem onClick={() => deletePostActions()}>
          <DeleteIcon />
          Delete post

        </DropdownItem>

      </Dropdown>
    </Container>
  )
}

export default OptionsPost

const Container = styled.div`
  margin-left: auto;
  position: relative;
  display: inline-block;
`

const OptionsIcon = styled(Options)`
  width: 25px;
  height: auto;
`

const Dropdown = styled.div`
  display: none;
  position: absolute;
  z-index: 1;
  width: max-content;
  background-color: rgb(255, 255, 255);
  border-radius: 5px; 
  

  ${Container}:hover & {
    display: block;
    box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.3);
  }
`

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;

  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.07);
  }
`

const DeleteIcon = styled(Delete)`
  width: 18px;
  height: auto;
  margin-right: 10px;

`

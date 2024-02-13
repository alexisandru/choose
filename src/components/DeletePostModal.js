import React from 'react'
import styled from 'styled-components'

import {useDispatch} from 'react-redux'

import {deletePost} from '../features/postsFeature.js'
import {deleteIdInLikesDislikes} from '../features/usersFeature.js'

const DeletePostModal = ({id, open, close}) => {

  const dispatch = useDispatch()

  const deletePostActions = () => {
    close()
    dispatch(deletePost(id))
    dispatch(deleteIdInLikesDislikes(id))
  }

  return (
    <Container open={open}>
      <ModalContent>
        <h3>Do you want to delete the post?</h3>
        <Buttons>
          <Button onClick={close}>Close</Button>
          <DeleteButton onClick={() => deletePostActions()}>Delete</DeleteButton>
        </Buttons>
      </ModalContent>
    </Container>
  )
}

export default DeletePostModal

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
  width: max-content;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
`

const Button = styled.button`
  background-color: rgb(255, 255, 255);
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 7px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0,0,0,0.1);
  }
`

const DeleteButton = styled(Button)`
  background-color: rgba(201, 52, 57, 0.9);
  border: 1px solid rgb(199, 36, 41);
  color: rgb(255, 255, 255);

  &:hover {
    background-color: rgb(201, 52, 57);
  }
`

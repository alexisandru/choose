import React from 'react'
import styled from 'styled-components'

import {useDispatch} from 'react-redux'

import {deletePost} from '../features/postsFeature.js'
import {deleteIdInLikesDislikes} from '../features/usersFeature.js'
import {updateLikesDislikesUsers, deletePostFirestore} from '../features/thunks.js'

const DeletePostModal = ({id, open, close}) => {

  const dispatch = useDispatch()

  const deletePostActions = () => {
    close()
    dispatch(deletePost(id))
    dispatch(deleteIdInLikesDislikes(id))
    dispatch(deletePostFirestore({id: id}))
    dispatch(updateLikesDislikesUsers({id: id}))
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
  background-color: rgba(0,0,0,0.5);
`

const ModalContent = styled.div`
  background-color: ${props => props.theme.surface};
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
  background-color: ${props => props.theme.surface};
  border: 2px solid ${props => props.theme.border_options};
  border-radius: 7px;
  padding: 10px 20px;
  cursor: pointer;
  color: ${props => props.theme.color};

  &:hover {
    background-color: rgba(0,0,0,0.1);
  }
`

const DeleteButton = styled(Button)`
  background-color: ${props => props.theme.error};
  border: 1px solid ${props => props.theme.error};
  color: ${props => props.theme.color};

  &:hover {
    background-color: ${props => props.theme.error};
    filter: brightness(90%);
  }
`

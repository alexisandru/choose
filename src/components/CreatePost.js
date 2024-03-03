import React, {useRef, useState, useCallback} from 'react'
import styled from 'styled-components'

import CreateOptions from './CreateOptions.js'

import {useDispatch, useSelector} from 'react-redux'
import {addPost} from '../features/postsFeature.js'

import { addPostToFirestore } from '../features/thunks.js'

const CreatePost = () => {
  const textareaRef = useRef()
  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.users.actual_user)

  const [clearOptionsInputs, setClearOptionsInputs] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [post, setPost] = useState({
    user_id: "",
    description: "",
    options: []
  })


  const changeHeight = () => {
    textareaRef.current.style.height = "auto"
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
  }

  const handleChangeText = (e) => {
    changeHeight()
    setPost({...post, user_id: currentUser, description: e.target.value});
  }


  const updateOptions = useCallback((newOptions) => {
    setPost(prev => {return {...prev, options: newOptions}})
  }, [])

  const checkIsValid = post.options.some(element => element.description === "") || (post.description === "")


  const sendPost = () => {
    dispatch(addPost(post))
    dispatch(addPostToFirestore())
    setClearOptionsInputs(prev => !prev)
    setShowOptions(false)
    setPost({
      ...post,
      description: "",
      options: []
    })
  }

  return (
    <Container>
      <Photo />
      <Content>
        <Description
          ref={textareaRef}
          onClick={() => setShowOptions(true)}
          onChange={e => handleChangeText(e)}
          value={post.description}
          placeholder="Add a description about...">
        </Description>
        {
          showOptions && <CreateOptions newOptions={updateOptions} reset={clearOptionsInputs} />
        }
        <FooterBtns>
          <BtnPost disabled={checkIsValid} onClick={() => sendPost()} >Post</BtnPost>
        </FooterBtns>
      </Content>
    </Container>
  )
}

export default CreatePost

const FooterBtns = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`

const Container = styled.div`
  width: 40%;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 10px;
  padding: 15px 20px;
  margin-top: 10px;
  box-shadow: rgba(0,0,0,0.24) 0px 3px 8px;

  display: flex;
  
  @media screen and (max-width: 400px) {
    width: 95%;
    margin-top: 0;
  }

`

const Content = styled.div`
  width: 100%;
`

const Description = styled.textarea`
  width: 100%;
  margin-bottom: 10px;
  font-size: 1em;
  outline-color: rgba(0,0,0,0.2);
  resize: none;
  border: none;
  padding: 5px;
  max-height: 300px;
`


const BtnPost = styled.button`
  padding: 5px 20px;
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 5px;
  background-color: rgba(56, 23, 122, 0.8);
  color: rgb(255,255,255);
  cursor: pointer;

  &:hover {
    background-color: rgba(56, 23, 122, 0.7);
  }

  &:disabled {
    cursor: auto;
    background-color: rgba(56, 23, 122, 0.2);
  }
  
  @media screen and (max-width: 400px) {
    padding: 10px 20px;
  }

`

const Photo = styled.div`
  width: 30px;
  margin-right: 20px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(0,0,0,0.4);

  flex-shrink: 0;
`


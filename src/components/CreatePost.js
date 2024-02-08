import React, {useRef, useState, useCallback} from 'react'
import styled from 'styled-components'

import CreateOptions from './CreateOptions.js'

import {useDispatch} from 'react-redux'
import {addPost} from '../features/postsFeature.js'

const CreatePost = () => {
  const textareaRef = useRef()
  const dispatch = useDispatch()


  const [post, setPost] = useState({
    description: "",
    options: []
  })

  const changeHeight = () => {
    textareaRef.current.style.height = "auto"
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
  }

  const handleChangeText = (e) => {
    changeHeight()
    setPost({...post, description: e.target.value});
  }


  const updateOptions = useCallback((newOptions) => {
    setPost(prev => {return {...prev, options: newOptions}})
  }, [])

  const checkIsValid = post.options.some(element => element.description === "") || (post.description === "")

  return (
    <Container>
      <Photo />
      <Content>
        <Description
          ref={textareaRef}
          onChange={e => handleChangeText(e)}
          value={post.description}
          placeholder="Add a description about...">
        </Description>
        <CreateOptions newOptions={updateOptions} />
        <FooterBtns>
          <BtnPost disabled={checkIsValid} onClick={() => dispatch(addPost(post))} >Post</BtnPost>
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

`

const Photo = styled.div`
  width: 30px;
  margin-right: 20px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(0,0,0,0.4);

  flex-shrink: 0;
`


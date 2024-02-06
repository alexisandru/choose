import React, {useState, useCallback, useEffect} from 'react'
import OptionInput from './OptionInput.js'

import styled from 'styled-components'

import {ReactComponent as Plus} from '../assets/plus.svg'

const CreateOptions = ({newOptions}) => {

  const [options, setOptions] = useState([
    {
      id: 1,
      description: "",
      votes: 0
    }, {
      id: 2,
      description: "",
      votes: 0
    }
  ])

  useEffect(() => {
    newOptions(options)
  }, [options, newOptions])


  const updateOption = useCallback((newOption, id) => {
    setOptions(prev => {
      const optionsUpdated = prev.map(option => {
        if (option.id === id) {
          return newOption
        } else {
          return option
        }
      })

      return optionsUpdated
    }
    )

  }, [])


  const addOption = () => {
    let lastId = options.at(-1).id + 1
    console.log("last", lastId)
    setOptions(prev => [...prev, {id: lastId, description: "", votes: 0}])

  }

  const deleteOption = id => {
    const optionsFiltered = options.filter(option => option.id !== id)
    console.log(optionsFiltered)
    setOptions(optionsFiltered)
  }

  const formattedOptions = options.map((option) => {
    if (option.id < 3) {
      return <OptionInput key={option.id} data={option} updateOption={updateOption} />
    } else {
      return (
        <DeleteOption key={option.id}>
          <OptionInput data={option} updateOption={updateOption} />
          <BtnDelete onClick={() => deleteOption(option.id)}>X</BtnDelete>
        </DeleteOption>
      )
    }
  })

  return (
    <Container>
      {formattedOptions}
      <PlusIcon isActive={options.length < 6} onClick={() => addOption()} />
    </Container>
  )
}

export default CreateOptions

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const PlusIcon = styled(Plus)`
  width: 45px;
  height: 45px;
  pointer-events: ${props => props.isActive ? "auto" : "none"};
  align-self: center;
  padding: 15px;
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    background-color: rgba(0,0,0,0.1);
  }


`


const AddBtn = styled.button`
  width: 100%;
  border: none;
  background-color: rgb(255,255,255);
  font-size: 1em;
`

const DeleteOption = styled.div`
  display: flex;
  align-items: center;
`

const BtnDelete = styled.button`
  width: 15%;
  align-self: stretch;
  margin-left: 10px;
  font-size: 1.1em;
  border: none;
  border-radius: 5px;
  background-color: rgb(255,255,255);

  &:hover {
    background-color: rgba(0,0,0,0.2);
  }
`





























































































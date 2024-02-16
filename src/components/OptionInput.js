import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const OptionInput = ({data, updateOption, reset}) => {

  const [option, setOption] = useState(data)

  const handleChangeInput = (i) => {
    setOption(prevState => {return {...prevState, description: i.target.value}})
  }

  useEffect(() => {
    updateOption(option, option.id)
  }, [option, updateOption])

  useEffect(() => {
    setOption(prev => {return {...prev, description: ""}})
  }, [reset])

  return (

    <Container>
      <Option
        type="text"
        maxLength="25"
        onChange={handleChangeInput}
        value={option.description}
        placeholder="Add an option..."

      />
      <Counter>{option.description.length}/25</Counter>
    </Container>
  )
}

export default OptionInput

const Option = styled.input`
  font-size: 0.9em;
  padding: 5px;
  border-radius: 3px;
  margin-bottom: 5px;
  border: 1px solid rgba(0,0,0,0.2);
  outline: none;
  width: 100%;

  &:focus {
    border: 1px solid rgba(0,0,0,0.5);
  }
  
  @media screen and (max-width: 400px) {
    padding: 10px 5px;
  }
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Counter = styled.span`
  align-self: flex-end;
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.75em;
  @media screen and (max-width: 400px) {
    font-size: 0.7em;
  }
`

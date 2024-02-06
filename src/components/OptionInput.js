import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const OptionInput = ({data, updateOption}) => {

  const [option, setOption] = useState(data)

  const handleChangeInput = (i) => {
    setOption(prevState => {return {...prevState, description: i.target.value}})
  }

  useEffect(() => {
    updateOption(option, option.id)
  }, [option, updateOption])

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
  border-radius: 5px;
  margin-bottom: 5px;
  border: 1px solid rgba(0,0,0,0.2);
  outline: none;
  width: 100%;
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
`

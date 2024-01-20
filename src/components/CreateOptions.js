import React, {useState, useCallback, useEffect} from 'react'
import OptionInput from './OptionInput.js'


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

  const formattedOptions = options.map((option) => {
    if (option.id < 3) {
      return <OptionInput data={option} updateOption={updateOption} />
    } else {
      return (
        <div>
          <OptionInput data={option} updateOption={updateOption} />
          <button>X</button>
        </div>
      )
    }
  })

  const addOption = () => {
    let lastId = options.at(-1).id + 1
    console.log("last", lastId)
    setOptions(prev => [...prev, {id: lastId, description: "", votes: 0}])

  }

  return (
    <div>
      {formattedOptions}
      <button onClick={() => addOption()}>Add</button>
    </div>
  )
}

export default CreateOptions
































































































import React, {useState} from 'react'
import styled from 'styled-components'


import {ReactComponent as Delete} from '../assets/delete.svg'
import {ReactComponent as Options} from '../assets/options.svg'


import DeletePostModal from './DeletePostModal.js'

const OptionsPost = ({id}) => {

  const [modal, setModal] = useState(false)

  return (
    <Container>
      <OptionsIcon />
      {modal
        ? <DeletePostModal id={id} open={modal} close={() => setModal(false)} />
        : <Dropdown>
          <DropdownItem onClick={() => setModal(true)}>
            <DeleteIcon />
            Delete post
          </DropdownItem>
        </Dropdown>
      }

    </Container>
  )
}

export default OptionsPost

const Container = styled.div`
  position: relative;
  display: inline-block;
`

const OptionsIcon = styled(Options)`
  width: 25px;
  height: auto;

  & > path {
    stroke: ${props => props.theme.icon};
  }
`

const Dropdown = styled.div`
  display: none;
  position: absolute;
  z-index: 2;
  right: 0;
  width: max-content;
  background-color: ${props => props.theme.surface};
  border-radius: 5px; 

  ${Container}:hover & {
    display: block;
    box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.8);
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
  & > path {
    stroke: ${props => props.theme.icon};
  }

`

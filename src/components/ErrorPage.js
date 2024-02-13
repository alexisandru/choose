import React from 'react'
import styled from 'styled-components'

const ErrorPage = () => {

  return (
    <Container>
      <h1>Error 404</h1>
      <h2>Pagina no encontrada, imbecil.</h2>

      <Button>Ir al inicio</Button>

    </Container>
  )
}

export default ErrorPage

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1.3em;
  border-radius: 5px;
  margin-top: 20px;

  background-color: rgba(56, 23, 122, 0.8);
  color: rgb(255,255,255);
  border: 1px solid rgba(0,0,0,0.2);
`

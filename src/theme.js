import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    background: ${({theme}) => theme.body};
    color: ${({theme}) => theme.text};
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }
`

export const darkTheme = {
  body: '#121212',
  color: 'rgba(255, 255, 255, 0.87)',
  error: '#b00020',
  color_error: '#000',
  surface: '#1e1e1e',
  surface_background: '#212121',
  primary: '#bb86fc',
  border_options: '#a35cfa',
  input_background: "#2b2b2b",
  icon: '#fff'
}

export const lightTheme = {
  body: '#fffffa',
  color: 'rgba(0,0,0,0.9)',
  error: '#b00020',
  color_error: 'rgba(255, 255, 255, 0.87)',
  surface: '#fff',
  surface_background: '#f5f5f5',
  primary: '#bb86fc',
  border_options: '#b377fc',
  input_background: "#fff",
  icon: '#000'
}

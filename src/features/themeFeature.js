import {createSlice} from '@reduxjs/toolkit'

const themeSaved = JSON.parse(localStorage.getItem("theme"))

const initialState = {
  darkEnabled: themeSaved == null ? true : themeSaved
}
console.log(themeSaved)

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state) => {
      JSON.stringify(localStorage.setItem("theme", !state.darkEnabled))
      return {...state, darkEnabled: !state.darkEnabled}
    }
  }
})

export const {setTheme} = themeSlice.actions
export default themeSlice.reducer

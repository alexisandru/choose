import {createSlice} from '@reduxjs/toolkit'
import data from '../assets/data.json'

const initialState = data.users

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {

  }
})

export default usersSlice.reducer

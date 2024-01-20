import {createSlice} from '@reduxjs/toolkit'

const initialState = []

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {

      if (state.length === 0) {
        return [
          ...state,
          {id: 1, ...action.payload}
        ]
      } else {
        let lastId = state.at(-1).id
        return [
          ...state, {id: lastId + 1, ...action.payload}
        ]

      }

    }
  }
}
)

export const {addPost} = postsSlice.actions

export default postsSlice.reducer

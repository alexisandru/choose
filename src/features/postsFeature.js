import {createSlice} from '@reduxjs/toolkit'
import data from '../assets/data.json'

const initialState = data.posts

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

    },
    addVotePost: (state, action) => {
      const updatedState = state.map(post => {
        if (post.id === action.payload.id) {

          const optionVotesUpdated = post.options.map(option => option.id === action.payload.newVote.id_option
            ? {...option, votes: option.votes + 1}
            : option
          )

          return {
            ...post,
            total_votes: post.total_votes + 1,
            options: optionVotesUpdated,
            voters: [...post.voters, action.payload.newVote]
          }
        } else {
          return post
        }
      })

      return updatedState
    }
  }
}
)

export const {addPost, addVotePost} = postsSlice.actions

export default postsSlice.reducer

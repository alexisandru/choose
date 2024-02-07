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
    },
    addLike: (state, action) => {
      const updatedState = state.map(post => {
        const {id_post, id_user} = action.payload
        if (post.id === id_post) {
          if (post.likes.includes(id_user)) {

            const likesUpdated = post.likes.filter(like => like !== id_user)
            return {
              ...post,
              likes: likesUpdated
            }

          } else {

            const dislikesUpdated = post.dislikes.filter(dislike => dislike !== id_user)
            return {
              ...post,
              likes: [...post.likes, id_user],
              dislike: dislikesUpdated
            }

          }
        } else {
          return post
        }
      })

      return updatedState
    },
    addDislike: (state, action) => {
      const updatedState = state.map(post => {
        if (post.id === action.payload.id_post) {
          const likesUpdated = post.likes.filter(like => like !== action.payload.id_user)

          return {
            ...post,
            likes: likesUpdated,
            dislikes: [...post.dislikes, action.payload.id_user]
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

export const {addPost, addVotePost, addLike} = postsSlice.actions

export default postsSlice.reducer

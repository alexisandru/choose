import {createSlice} from '@reduxjs/toolkit'
import data from '../assets/users.json'

const initialState = {
  actual_user: 1,
  users: data.users
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addLikeUser: (state, action) => {
      const updatedState = state.users.map(user => {
        const {id_post, id_user} = action.payload
        if (user.id === id_user) {
          if (user.likes.includes(id_post)) {
            const likesUpdated = user.likes.filter(like => like !== id_post)

            return {
              ...user,
              likes: likesUpdated
            }
          } else {
            const dislikesUpdated = user.dislikes.filter(dislike => dislike !== id_post)

            return {
              ...user,
              likes: [id_post, ...user.likes],
              dislikes: dislikesUpdated
            }
          }
        } else {
          return user
        }
      })

      return {...state, users: updatedState}
    },
    addDislikeUser: (state, action) => {
      const updatedState = state.users.map(user => {
        const {id_post, id_user} = action.payload
        if (user.id === id_user) {
          if (user.dislikes.includes(id_post)) {
            const dislikesUpdated = user.dislikes.filter(dislike => dislike !== id_post)

            return {
              ...user,
              dislikes: dislikesUpdated
            }
          } else {
            const likesUpdated = user.likes.filter(like => like !== id_post)

            return {
              ...user,
              dislikes: [id_post, ...user.dislikes],
              likes: likesUpdated
            }
          }
        } else {
          return user
        }
      })

      return {...state, users: updatedState}

    },
    deleteIdInLikesDislikes: (state, action) => {

      const updatedState = state.users.map(user => {
        let isInLikes = user.likes.includes(action.payload)
        let isInDislikes = user.dislikes.includes(action.payload)

        if (isInLikes === true) {
          return {
            ...user,
            likes: user.likes.filter(like => like !== action.payload)
          }
        } else if (isInDislikes === true) {
          return {
            ...user,
            dislikes: user.dislikes.filter(dislike => dislike !== action.payload)
          }
        } else {
          return user
        }
      })


      return {...state, users: updatedState}
    }
  }
})

export const {addLikeUser, addDislikeUser, deleteIdInLikesDislikes} = usersSlice.actions

export default usersSlice.reducer

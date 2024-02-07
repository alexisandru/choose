import {createSlice} from '@reduxjs/toolkit'
import data from '../assets/users.json'

const initialState = data.users

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addLikeUser: (state, action) => {
      const updatedState = state.map(user => {
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
              likes: [...user.likes, id_post],
              dislikes: dislikesUpdated
            }
          }
        } else {
          return user
        }
      })

      return updatedState
    }
  }
})

export const {addLikeUser} = usersSlice.actions

export default usersSlice.reducer

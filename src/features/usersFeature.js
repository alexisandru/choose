import {createSlice} from '@reduxjs/toolkit'


const initialState = {
  actual_user: null,
  users: []
}



const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addIdCurrentUser: (state, action) => {
      console.log("se adjunto id del usuario current")
      return {...state, actual_user: action.payload}
    },
    addUser: (state, action) => {
      const aux = action.payload
      const checkUser = state.users.find(user => user.id === action.payload.id)

      if (checkUser === undefined) {
        const newUser = {
          id: aux.id,
          name: aux.name,
          likes: [],
          dislikes: [],
          followers: [],
          following: []
        }
        return {...state, users: [newUser, ...state.users], actual_user: aux.id}
      } else {
        return {...state, actual_user: aux.id}
      }
    },
    addOneUser: (state, action) => {
      return {...state, users: [action.payload, ...state.users]}
    },
    addLikeUser: (state, action) => {
      const updatedState = state.users.map(user => {
        const {id_post, id_user} = action.payload
        if (user.id === id_user) {

          if (user.likes.includes(id_post)) {
            // si ya incluye el like, lo saca del post
            const likesUpdated = user.likes.filter(like => like !== id_post)
            return {
              ...user,
              likes: likesUpdated
            }
          } else {
            // sino agrega el like y elimina el dislike
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
    },
    addFollower: (state, action) => {
      const updatedState = state.users.map(user => {
        if (user.id === action.payload) {
          return {...user, followers: [state.actual_user, ...user.followers]}
        } else {
          return user
        }
      })

      return {...state, users: updatedState}
    },
    addFollowing: (state, action) => {
      const updatedState = state.users.map(user => {
        if (user.id === state.actual_user) {
          return {...user, following: [action.payload, ...user.following]}
        } else {
          return user
        }
      })

      return {...state, users: updatedState}
    },
    deleteFollower: (state, action) => {
      const updatedState = state.users.map(user => {
        if (user.id === action.payload) {
          return {...user, followers: user.followers.filter(follower => follower !== state.actual_user)}
        } else {
          return user
        }
      })

      return {...state, users: updatedState}
    },
    deleteFollowing: (state, action) => {
      const updatedState = state.users.map(user => {
        if (user.id === state.actual_user) {
          return {...user, following: user.following.filter(following => following !== action.payload)}
        } else {
          return user
        }
      })

      return {...state, users: updatedState}
    }
  },
})

export const {addIdCurrentUser, addUser, addOneUser, addLikeUser, addDislikeUser, deleteIdInLikesDislikes, addFollower, addFollowing, deleteFollower, deleteFollowing} = usersSlice.actions

export default usersSlice.reducer

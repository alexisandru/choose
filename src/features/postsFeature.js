import {createSlice} from '@reduxjs/toolkit'


const initialState = []

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addAllPostsFromFirestore: (_, action) => {
      console.log('addAllPosts')
      return [...action.payload]
    },
    addOnePost: (state, action) => {
      return [action.payload, ...state]
    },
    addPost: (state, action) => {
      let newPost = action.payload
      newPost = {
        ...newPost,
        likes: [],
        dislikes: [],
        voters: [],
        total_votes: 0,
        date: Date.now()
      }



      if (state.length === 0) {
        return [
          {id: 1, ...newPost},
          ...state
        ]
      } else {
        let lastId = state.at(0).id
        return [
          {id: lastId + 1, ...newPost},
          ...state
        ]

      }

    },
    deletePost: (state, action) => {
      const stateWithPostDeleted = state.filter(post => post.id !== action.payload)
      return stateWithPostDeleted
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
              dislikes: dislikesUpdated,
              likes: [...post.likes, id_user]
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
        const {id_post, id_user} = action.payload
        if (post.id === id_post) {
          if (post.dislikes.includes(id_user)) {
            const dislikesUpdated = post.dislikes.filter(dislike => dislike !== id_user)
            return {
              ...post,
              dislikes: dislikesUpdated
            }
          } else {

            const likesUpdated = post.likes.filter(like => like !== id_user)

            return {
              ...post,
              likes: likesUpdated,
              dislikes: [...post.dislikes, id_user]
            }
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

export const {addAllPostsFromFirestore, addOnePost, addPost, deletePost, addVotePost, addLike, addDislike} = postsSlice.actions

export default postsSlice.reducer

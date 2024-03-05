import {createAsyncThunk} from '@reduxjs/toolkit'
import {addOneUser} from './usersFeature'
import {addOnePost, addAllPostsFromFirestore} from './postsFeature'
import {getDocs, or, arrayUnion, arrayRemove, deleteDoc, orderBy, collection, onSnapshot, doc, updateDoc, addDoc, where, query} from 'firebase/firestore'
import {db} from '../firebase.js'

export const fetchUsersFirestore = createAsyncThunk(
  'users/fetchUsersFirestore',
  async (_, thunkAPI) => {
    const usersRef = await getDocs(collection(db, "users"))
    usersRef.forEach(user => thunkAPI.dispatch(addOneUser(user.data())))
  }
)

export const fetchPostsFirestore = createAsyncThunk(
  'posts/fetchPostsFirestore',
  async (_, thunkAPI) => {
    const postsRef = await getDocs(collection(db, "posts"))
    postsRef.forEach(post => thunkAPI.dispatch(addOnePost(post.data())))
  }
)
export const listenerPostsFirestore = createAsyncThunk(
  'posts/listenerPostsFirestore',
  async (_, thunkAPI) => {
    const q = query(collection(db, "posts"), orderBy("id", "desc"))
    onSnapshot(q, (doc) => {
      const posts = doc.docs.map(docc => docc.data())
      thunkAPI.dispatch(addAllPostsFromFirestore(posts))
    })
  }
)
export const addNewUserToFirebase = createAsyncThunk(
  'users/addNewUserToFirebase',
  async (user) => {
    const newUser = {
      ...user,
      likes: [],
      dislikes: [],
      followers: [],
      following: []
    }
    await addDoc(collection(db, "users"), newUser)
  },
  {
    condition: async (user, {getState}) => {
      const {users} = await getState()
      const userExist = await users.users.find(userr => userr.id === user.id)
      if (userExist !== undefined) {
        return false
      }

    }
  }
)

export const addPostToFirestore = createAsyncThunk(
  'posts/addPostToFirestore',
  async (_, thunkAPI) => {
    const {posts} = await thunkAPI.getState()
    await addDoc(collection(db, "posts"), posts[0])
  }
)

export const addReactionUserToFirestore = createAsyncThunk(
  'users/addReactionUserToFirestore',
  async (action, thunkAPI) => {
    const {id} = action
    const {users} = await thunkAPI.getState()
    const userSearch = await users.users.find(user => user.id === id)

    const queryUser = query(collection(db, "users"), where("id", "==", id))
    const refQuery = await getDocs(queryUser)

    const queryUpdate = doc(db, "users", refQuery.docs[0].id)
    await updateDoc(queryUpdate, {
      "likes": userSearch.likes,
      "dislikes": userSearch.dislikes,
    })
  }
)

export const addUserActionsToPostFirestore = createAsyncThunk(
  'posts/addUserActionsToPostFirestore',
  async (action, thunkAPI) => {
    const {id} = action
    // busca lsa reacciones actualizadas del post
    const {posts} = await thunkAPI.getState()
    const postSearch = await posts.find(post => post.id === id)

    const queryPost = query(collection(db, "posts"), where("id", "==", id))
    const refQuery = await getDocs(queryPost)

    const queryUpdate = doc(db, "posts", refQuery.docs[0].id)
    await updateDoc(queryUpdate, {
      "likes": postSearch.likes,
      "dislikes": postSearch.dislikes,
      "options": postSearch.options,
      "voters": postSearch.voters,
      "total_votes": postSearch.total_votes
    })

  }
)

export const deletePostFirestore = createAsyncThunk(
  'posts/deletePostFirestore',
  async (action) => {
    const {id} = action
    const queryPost = query(collection(db, "posts"), where("id", "==", id))
    const refQuery = await getDocs(queryPost)

    await deleteDoc(doc(db, "posts", refQuery.docs[0].id))
  }
)

export const updateLikesDislikesUsers = createAsyncThunk(
  'users/updateLikesDislikesUsers',
  async (action, thunkAPI) => {
    const {id} = action
    const usersQuery = query(collection(db, "users"),
      or(
        where("likes", "array-contains", id),
        where("dislikes", "array-contains", id)
      )
    )
    const refQuery = await getDocs(usersQuery)

    refQuery.forEach(async documento => {
      const {users} = await thunkAPI.getState()
      const user = await users.users.find(user => user.id === documento.data().id)


      const queryUser = doc(db, "users", documento.id)
      await updateDoc(queryUser, {
        "likes": user.likes,
        "dislikes": user.dislikes
      })

    })

  }
)


export const addFollowerFirestore = createAsyncThunk(
  'users/addFollowerFirestore',
  async (id, thunkAPI) => {
    const {actual_user} = await thunkAPI.getState().users
    const getUser = query(collection(db, "users"), where("id", "==", id))
    const refUser = await getDocs(getUser)
    const updateRef = doc(db, "users", refUser.docs[0].id)
    await updateDoc(updateRef, {
      followers: arrayUnion(actual_user)
    })
  }
)

export const addFollowingFirestore = createAsyncThunk(
  'users/addFollowingFirestore',
  async (id, thunkAPI) => {
    const {actual_user} = await thunkAPI.getState().users
    const getUser = query(collection(db, "users"), where("id", "==", actual_user))
    const refUser = await getDocs(getUser)
    const updateRef = doc(db, "users", refUser.docs[0].id)
    await updateDoc(updateRef, {
      following: arrayUnion(id)
    })
  }
)

export const deleteFollowerFirestore = createAsyncThunk(
  'users/deleteFollowerFirestore',
  async (id, thunkAPI) => {
    const {actual_user} = await thunkAPI.getState().users
    const getUser = query(collection(db, "users"), where("id", "==", id))
    const refUser = await getDocs(getUser)
    const updateRef = doc(db, "users", refUser.docs[0].id)
    await updateDoc(updateRef, {
      followers: arrayRemove(actual_user)
    })
  }
)

export const deleteFollowingFirestore = createAsyncThunk(
  'users/deleteFollowingFirestore',
  async (id, thunkAPI) => {
    const {actual_user} = await thunkAPI.getState().users
    const getUser = query(collection(db, "users"), where("id", "==", actual_user))
    const refUser = await getDocs(getUser)
    const updateRef = doc(db, "users", refUser.docs[0].id)
    await updateDoc(updateRef, {
      following: arrayRemove(id)
    })
  }
)

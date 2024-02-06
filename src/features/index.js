import {combineReducers} from 'redux'
import postsReducer from './postsFeature.js'
import usersReducer from './usersFeature.js'


const allReducers = combineReducers({
  posts: postsReducer,
  users: usersReducer
})

export default allReducers

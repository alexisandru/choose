import {combineReducers} from 'redux'
import postsReducer from './postsFeature.js'
import usersReducer from './usersFeature.js'
import themeReducer from './themeFeature.js'

const allReducers = combineReducers({
  posts: postsReducer,
  users: usersReducer,
  theme: themeReducer
})

export default allReducers

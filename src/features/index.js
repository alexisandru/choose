import {combineReducers} from 'redux'
import postsReducer from './postsFeature.js'

const allReducers = combineReducers({
  posts: postsReducer
})

export default allReducers

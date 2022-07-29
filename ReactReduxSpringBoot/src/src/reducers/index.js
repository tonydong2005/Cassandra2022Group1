import { combineReducers } from 'redux'
import books from './books'
import keyspaces from './keyspaces'

export default combineReducers({
  books,
  keyspaces
})
import { combineReducers } from 'redux'
import books from './books'
import keyspaces from './keyspaces'
import tables from './tables'

export default combineReducers({
  books,
  keyspaces,
  tables
})
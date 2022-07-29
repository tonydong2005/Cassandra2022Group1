import { combineReducers } from 'redux'
import books from './books'
import keyspaces from './keyspaces'
import tables from './tables'
import rows from './rows'
import columns from './columns'

export default combineReducers({
  books,
  keyspaces,
  tables,
  rows,
  columns
})
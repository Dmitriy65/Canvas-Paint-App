import { combineReducers } from 'redux'
import { fileReducer } from './file'

export const rootReducer = combineReducers({
  file: fileReducer,
})

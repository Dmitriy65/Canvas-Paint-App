import { HANDLE_FILE_SUCCESS, HANDLE_FILE_ERROR } from '../actions/fileActions'

const initialState = {
  canvas: '',
  outputLink: '',
  errorMessage: ''
}

export function fileReducer(state = initialState, action) {
  switch (action.type) {
    case HANDLE_FILE_SUCCESS:
      return { ...state, outputLink: action.payload[0], canvas: action.payload[1], errorMessage: '' }
    case HANDLE_FILE_ERROR:
      return { ...state, outputLink: null, canvas: null, errorMessage: action.payload}
    default:
      return state
  }
}

import FileUtility from '../utils/FileUtility';
export const HANDLE_FILE_SUCCESS = 'HANDLE_FILE_SUCCESS';
export const HANDLE_FILE_ERROR = 'HANDLE_FILE_ERROR';

export const handleInputFile = (file) => {
  return async dispatch => {

    const [outputLink, canvas, error] = await FileUtility.processInputFile(file);

    if (error) dispatch(errorFileProcess(error));
    else dispatch(successFileProcess([outputLink, canvas]));
  }
}

export const successFileProcess = (fileProps) => {
  return {
    type: HANDLE_FILE_SUCCESS,
    payload: fileProps
  }
}

export const errorFileProcess = (errorMessage) => {
  return {
    type: HANDLE_FILE_ERROR,
    payload: errorMessage
  }
}
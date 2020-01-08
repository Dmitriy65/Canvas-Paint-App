import configureMockStore from 'redux-mock-store';
import "babel-polyfill"
import { successFileProcess, errorFileProcess, HANDLE_FILE_SUCCESS, HANDLE_FILE_ERROR } from '../src/actions/fileActions';
import { stringCanvas } from './CanvasField_test';
const mockStore = configureMockStore();
const store = mockStore({});

describe('action creators', () => {
  it('creates successFileProcess action when file reading was success', () => {

    store.dispatch(successFileProcess(
      {
        type: HANDLE_FILE_SUCCESS,
        payload: [
          'blob:http://localhost:3000/ddafffc8-1d42-4cee-a186-1077686179f4',
          stringCanvas
        ]
      }
    ));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('creates errorFileProcess action when file reading was not success', () => {

    store.dispatch(errorFileProcess(
      {
        type: HANDLE_FILE_ERROR,
        payload: 'Cant read input file, type doesn`t match "text/plain"'
      }
    ));
    expect(store.getActions()).toMatchSnapshot();
  });
});

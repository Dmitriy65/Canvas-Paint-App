import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import "core-js/stable";
import "regenerator-runtime/runtime";
import {
  handleInputFile,
  HANDLE_FILE_ERROR
} from '../src/actions/fileActions';


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);
describe('async actions tests', () => {
  let store;
  beforeEach(() => {
    store = mockStore({}); 
  });

  it('check for valid input file commands', async () => {
    const fileData =
      'C 20 4\n' +
      'L 22 2 22 6\n';
    const file = new File([fileData], 'input.txt', { type: 'text/plain' });

    await store.dispatch(handleInputFile(file));

    expect(store.getActions()[0]).toEqual({
      type: HANDLE_FILE_ERROR,
      payload: "Incorrect input commands.Please, try another commands!"
    });

  });

  it('check for existing data in input file', async () => {
    const file = new File([''], 'input.txt', { type: 'text/plain' });

    await store.dispatch(handleInputFile(file));

    expect(store.getActions()[0]).toEqual({
      type: HANDLE_FILE_ERROR,
      payload: "File doesn`t contains any data!"
    });

  });

  it('check for existing command to create canvas', async () => {
    const fileData =
      'L 10 2 6 2\n' +
      'R 16 1 20 3\n';

    const file = new File([fileData], 'input.txt', { type: 'text/plain' });

    await store.dispatch(handleInputFile(file));

    expect(store.getActions()[0]).toEqual({
      type: HANDLE_FILE_ERROR,
      payload: "Command to create canvas doesn`t exist!"
    });

  });

});
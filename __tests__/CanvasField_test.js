import React from 'react';
import { shallow } from "enzyme";
import CanvasField from '../src/components/CanvasField/CanvasField.js';

export const stringCanvas =
  '----------------------\n' +
  '|oooooooooooooooxxxxx|\n' +
  '|xxxxxxooooooooox   x|\n' +
  '|     xoooooooooxxxxx|\n' +
  '|     xoooooooooooooo|\n' +
  '----------------------';

function shallowSetup(command) {
  let props;

  if (command === 'no error') {
    props = {
      canvas: stringCanvas,
      errorMessage: ''
    }
  } else if (command === 'with error') {
    props = {
      canvas: '',
      errorMessage: 'Incorrect input commands.Please, try again!'
    }
  }

  const enzymeWrapper = shallow(<CanvasField {...props} />);


  return {
    props,
    enzymeWrapper
  };
}

describe('Shallow rendered CanvasField component', () => {
  it('should render the canvas without error', () => {
    const { enzymeWrapper, props } = shallowSetup('no error');

    expect(enzymeWrapper.find('pre').text()).toBe(props.canvas);
    expect(enzymeWrapper.find('p').length).toEqual(0);
  });

  it('should render error without canvas', () => {
    const { enzymeWrapper, props } = shallowSetup('with error');

    expect(enzymeWrapper.find('p').text()).toBe(props.errorMessage);
    expect(enzymeWrapper.find('pre').length).toEqual(0);
  });
});


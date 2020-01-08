import React from 'react';
import { shallow } from "enzyme";
import ButtonGroup from '../src/components/ButtonGroup/ButtonGroup.js';

function shallowSetup() {
  const props = {
    link: 'blob:http://localhost:3000/8f543601-e785-4879-a63f-0b9856a1981e',
  }
  const enzymeWrapper = shallow(<ButtonGroup {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Shallow rendered ButtonGroup component', () => {
  it('should render the second active buttons if correct file was recieved', () => {
    const { enzymeWrapper, props } = shallowSetup();

    expect(enzymeWrapper.find('a').hasClass('active-link')).toBe(true);
    expect(enzymeWrapper.find('a[href]').equals(props.link));
    expect(enzymeWrapper.find('a').text()).toBe('Click to download your txt file');
  });
});


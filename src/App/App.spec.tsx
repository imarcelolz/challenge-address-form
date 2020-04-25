import { mount, shallow } from 'enzyme';
import React from 'react';
import { AddressPage } from '../Pages/Address';
import App from './App';

let wrapper;

describe('Context: Rendering', () => {
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
});


describe('Context: Functional', () => {
  beforeEach(() => {
    wrapper = mount(<App />);
  });

  it('renders renders the AddressPage', () => {
    expect(wrapper.exists(AddressPage)).toBeTruthy();
  });
});

import { shallow } from 'enzyme';
import React from 'react';
import { Layout } from './Layout';

describe('Context: Rendering', () => {
  it('render without crash', () => {
    const wrapper = shallow(<Layout />);

    expect(wrapper).toMatchSnapshot();
  });
});

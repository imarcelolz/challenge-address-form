
import { userMock } from '@/Mocks/User';
import { mount, shallow } from 'enzyme';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import SuccessPage from './Success.Page';

let wrapper, history;

beforeEach(() => {
  history = createMemoryHistory();
  history.push('/success', { user: userMock });
})

describe('Context: Rendering', () => {
  beforeEach(() => {
    wrapper = shallow(
      <Router history={history}>
        <SuccessPage />
      </Router>);
  });

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
});


describe('Context: Functional', () => {
  beforeEach(() => {
    wrapper = mount(
      <Router history={history}>
        <SuccessPage />
        </Router>
      );
  });

  it('back button', () => {
    history.goBack = jest.fn();

    wrapper.setProps({ history: history });
    wrapper.find('.back').invoke('onClick')();

    expect(history.goBack).toHaveBeenCalled();
  });
});

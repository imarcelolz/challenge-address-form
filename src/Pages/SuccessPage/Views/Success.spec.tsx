
import { userMock } from '@/Mocks/User';
import { mount, shallow } from 'enzyme';
import React from 'react';
import SuccessView from './Success.view';

let wrapper;
describe('Context: Rendering', () => {
  beforeEach(() => {
    wrapper = shallow(<SuccessView user={userMock} onBack={null} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
});


describe('Context: Functional', () => {
  beforeEach(() => {
    wrapper = mount(<SuccessView user={userMock} onBack={null} />);
  });

  it('renders the user name ', () => {
    expect(wrapper.html()).toContain(userMock.name);
  });

  it('triggers the onBack on button click', () => {
    const mock = jest.fn();
    wrapper.setProps({ onBack: mock })

    wrapper.find('.back').invoke('onClick')();
    expect(mock).toHaveBeenCalledTimes(1);
  });
});

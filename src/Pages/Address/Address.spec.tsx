import { mount, shallow } from 'enzyme';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import AddressPage, { AddressPage as AddressPageClass } from './Address.Page';
import { FormView } from './Views';

const mountAddressPage = (history, searchCity = undefined, validatePostalCode = undefined) =>
  mount(
    <Router history={history}>
      <AddressPage searchCity={searchCity} validatePostalCode={validatePostalCode} />
    </Router>
  ).find(AddressPageClass);

let wrapper, history;
describe('Context: Rendering', () => {
  beforeEach(() => {
    history = createMemoryHistory();
    wrapper = shallow(
      <Router history={history}>
        <AddressPage />
      </Router>
    );
  });

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Context: Functional', () => {
  const form = () => wrapper.find(FormView).first();
  const formValidate = () => form().invoke('validate')();
  const formSearch = (value) => form().invoke('onSearch')(value);

  const searchCity = jest.fn().mockResolvedValue([]);
  const validatePostalCode = jest.fn().mockResolvedValue(true)

  beforeEach(() => {
    history = createMemoryHistory();
    wrapper = mountAddressPage(history, searchCity, validatePostalCode);
  });

  it('updates the state during form updates ', () => {
    form().invoke('onChange')({ name: 'Nice User name' });

    const user = wrapper.state('user')

    expect(user.name).toEqual('Nice User name');
  });

  it('redirects to success on form submission', () => {
    const user = wrapper.state('user')
    const history = wrapper.prop('history');
    const spy = jest.spyOn(history, 'push');

    form().invoke('onSubmit')();

    expect(spy).toHaveBeenCalledWith('/success', { user });
  });

  it('calls the service on form validate', () => {
    formValidate();
  });

  it('searchCity will never fail', () => {
    wrapper = mountAddressPage(history);
    formSearch('ham');
  });

  it('searchCity calls the correct service', () => {
    const mock = jest.fn().mockResolvedValueOnce([]);
    wrapper = mountAddressPage(history, mock);

    formSearch('ham');
    expect(mock).toHaveBeenCalledWith('ham');
  });

  it('validatePostalCode will never fail', () => {
    wrapper = mountAddressPage(history);
    formValidate();
  });

  it('validatePostalCode calls the correct service', () => {
    const mock = jest.fn().mockResolvedValueOnce(true);
    wrapper = mountAddressPage(history, undefined, mock);

    formValidate();
    expect(mock).toHaveBeenCalled();
  });
});

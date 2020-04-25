import { userMock } from '@/Mocks/User';
import { Autocomplete } from '@material-ui/lab';
import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import FormView from './Form.view';

let wrapper;

beforeEach(() => {
  wrapper = mount(<FormView />);
});

describe('Context: Rendering', () => {
  const value = (selector) => wrapper.find(selector).first().prop('value');

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with user', () => {
    wrapper.setProps({ user: userMock })
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the user fields', () => {
    wrapper.setProps({ user: userMock })

    expect(value('.name')).toEqual(userMock.name);
    expect(value('.address')).toEqual(userMock.address);
    expect(value('.postalCode')).toEqual(userMock.postalCode);
    expect(value(Autocomplete)).toEqual(userMock.city);
  });
});

describe('Context: Functional', () => {
  describe('Context: field change trigger onChange event', () => {
    const mock = jest.fn();

    const updateField = (selector) => {
      wrapper.find(selector).first().invoke('onChange')({ target: { value: selector }});
    };

    beforeEach(() => {
      wrapper.setProps({ onChange: mock });
    });

    it('field .name', () => {
      updateField('.name');

      expect(mock).toHaveBeenCalledWith({ name: '.name' });
    });

    it('field .address', () => {
      updateField('.address');

      expect(mock).toHaveBeenCalledWith({ address: '.address' });
    });

    it('field .postalCode', () => {
      updateField('.postalCode');

      expect(mock).toHaveBeenCalledWith({ postalCode: '.postalCode' });
    });

    it('onChange will never fail', () => {
      wrapper.setProps({ onChange: undefined });
      updateField('.postalCode');
    });
  });

  describe('Context: Submit Button', () => {
    const submitButton = () => wrapper.find('.submit').first();
    const isSubmitDisabled = () => submitButton().prop('disabled');

    beforeEach(() => {
      wrapper.setProps({ user: userMock });
    });

    it('enable submit with name and address fields', () => {
      expect(isSubmitDisabled()).toBeFalsy();
    });

    it('disable submit without name', () => {
      wrapper.setProps({ user: { ...userMock, name: '' } });
      expect(isSubmitDisabled()).toBeTruthy();
    });

    it('disable submit without address', () => {
      wrapper.setProps({ user: { ...userMock, address: '' } });
      expect(isSubmitDisabled()).toBeTruthy();
    });

    it('trigger onSubmit on click', () => {
      const mock = jest.fn();

      wrapper.setProps({ onSubmit: mock });
      submitButton().invoke('onClick')();

      expect(mock).toHaveBeenCalledTimes(1);
    });

    it('onSubmit click will never fail', () => {
      wrapper.setProps({ onSubmit: undefined });

      submitButton().invoke('onClick')();
    });
  });

  describe('Context: Validation', () => {
    const postalCode = () => wrapper.find('.postalCode').first();

    it('validate will never fail', () => {
      wrapper.setProps({ validate: undefined });

      postalCode().invoke('onBlur')();
    });

    it('trigger validate on postalCode blur ', () => {
    });
  });

  describe('Context: Search', () => {
    let onSearchMock;
    const changeCity = (key) => act(() =>
      wrapper.find('.city').first().invoke('onKeyPress')({ key: key, target: { value: 'a' }})
    );

    beforeEach(() => {
      onSearchMock = jest.fn().mockResolvedValue([]);
      wrapper.setProps({ onSearch: onSearchMock });
    });

    it('onSearch will never fail', async () => {
      wrapper.setProps({ onSearch: undefined });
      await changeCity('a');
    });

    it('trigger onSearch while the user types on city', async () => {
      await changeCity('a');

      expect(onSearchMock).toHaveBeenCalledWith('aa');
    });
  });
});

import { User } from '@/Models/User';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { AddressPageProps, AddressPageState, UserValidation } from './Address.types';
import { FormView } from './Views';

export class AddressPage extends Component<AddressPageProps, AddressPageState> {
  static defaultProps = {
    searchCity: () => Promise.resolve([]),
    validatePostalCode: () => Promise.resolve(false),
  };

  set User(user: User) { this.setState({ user }); }
  get User(): User { return this.state.user; }
  get Validation(): UserValidation { return this.state.validation; }
  set Validation(validation: UserValidation) { this.setState({ validation }); }

  constructor(props) {
    super(props);
    this.state = {
      user: { name: '', address: '', city: '', postalCode: '' },
      validation: null,
    }
  }

  updateUser = (updatedAttributes: Partial<User>) => {
    this.User = { ...this.User, ...updatedAttributes};
  }

  setSuccess = () => {
    this.props.history.push('/success', { user: this.User });
  }

  validate = () => {
    const { validatePostalCode } = this.props;

    const postalCode = parseInt(this.User.postalCode, 10);
    validatePostalCode(postalCode).then((validPostalCode) => {
      this.Validation = {};
      if(!validPostalCode) {
        this.Validation = { postalCode: 'Invalid postal code' };
      }
    })
  };

  onUserChanged = (updatedAttributes: Partial<User>) => {
    this.updateUser(updatedAttributes);
  };

  onSubmitted = () => {
    this.setSuccess();
  };

  render() {
    return (
      <FormView
        user={this.User}
        onChange={this.onUserChanged}
        onSearch={this.props.searchCity}
        onSubmit={this.onSubmitted}
        validate={this.validate}
        validation={this.Validation}
      />
    );
  }
}

export default withRouter(AddressPage);

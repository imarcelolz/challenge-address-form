import { User } from '@/Models/User';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { SuccessPageProps, SuccessPageState } from './Success.types';
import { SuccessView } from './Views';

export class SuccessPage extends Component<SuccessPageProps, SuccessPageState> {
  get User(): User { return this.props.location.state.user }

  onBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (<SuccessView user={this.User} onBack={this.onBack}/>);
  }
}

export default withRouter(SuccessPage);

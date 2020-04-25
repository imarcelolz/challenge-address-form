import { SuccessPage } from '@/Pages/SuccessPage';
import { AddressService } from '@/Services/AddressService';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AddressPage } from '../Pages/Address';
import { AppProps } from './App.types';
import { Layout } from './Layouts/Layout';

const service = new AddressService();

const App = (_props: AppProps) => (
  <Layout>
    <BrowserRouter>
      <Switch>
        <Route exact path="/success" component={SuccessPage} />
        <Route exact path="/">
          <AddressPage searchCity={service.searchCity} validatePostalCode={service.validatePostalCode} />
        </Route>
      </Switch>
    </BrowserRouter>
  </Layout>
);

export default App;

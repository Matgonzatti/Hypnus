import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Login from '../pages/Login';
import Clientes from '../pages/Clientes';
import ForgotPassword from '../pages/ForgotPassword';
import Schedule from '../pages/Schedule';
import Anamnese from '../pages/Anamnese';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/Forgot-password" component={ForgotPassword} />
    <Route path="/Clientes" component={Clientes} isPrivate />
    <Route path="/Schedule" component={Schedule} isPrivate />
    <Route path="/Anamnese" component={Anamnese} isPrivate />
  </Switch>
);

export default Routes;

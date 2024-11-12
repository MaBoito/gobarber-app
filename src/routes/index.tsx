import React from 'react';
import { Routes as Switch } from 'react-router-dom';
import CustomRoute from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <CustomRoute path="/" element={<SignIn />} />
    <CustomRoute path="/signup" element={<SignUp />} />
    <CustomRoute path="/Dashboard" element={<Dashboard />} isPrivate />
  </Switch>
);

export default Routes;



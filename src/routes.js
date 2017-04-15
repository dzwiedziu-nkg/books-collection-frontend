import React from 'react';
import { Route, IndexRoute, Switch } from 'react-router';
import App from './components/App';
import Rooms from './components/Rooms';

export default <App>
  <Route exact path="/" component={Rooms}/>
</App>;

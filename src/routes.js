import React from 'react';
import { Route, IndexRoute, Switch } from 'react-router';
import App from './containers/App';
import Rooms from './containers/Rooms';

export default <App>
  <Route exact path="/" component={Rooms}/>
</App>;

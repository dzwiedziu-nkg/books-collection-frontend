import React from 'react';
import { Route, IndexRoute, Switch } from 'react-router';
import App from './containers/App';
import Rooms from './containers/Rooms';
import Furniture from './containers/Furniture';

export default <App>
  <Route exact path="/" component={Rooms}/>
  <Route path="/:room/" component={Furniture}/>
</App>;

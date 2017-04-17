/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter} from 'react-router-redux'
import { Route, IndexRoute, Switch } from 'react-router';
import App from './App';
import Rooms from './Rooms';
import Furniture from './Furniture';

const Root = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history} >
      <App>
        <Route exact path="/" component={Rooms}/>
        <Route path="/:room/" component={Furniture}/>
      </App>
    </ConnectedRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default Root;

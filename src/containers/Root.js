/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter} from 'react-router-redux'
import { Route, IndexRoute, Switch } from 'react-router';
import App from './App';
import { Rooms, Furniture, Shelf }  from './Models';
import RoomForm from './RoomForm';
import Breadcrumb from './Breadcrumb';
import Notify from "./Notify";

const Root = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history} >
      <App>
        <Breadcrumb/>
        <Notify/>
        <Switch>
          <Route exact path="/" component={Rooms}/>
          <Route path="/add/" component={RoomForm}/>
          <Route path="/:room/edit/" component={RoomForm}/>
          <Route path="/:room/:furniture/" component={Shelf}/>
          <Route path="/:room/" component={Furniture}/>
        </Switch>
      </App>
    </ConnectedRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default Root;

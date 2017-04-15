import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import reducers from '../reducers';
import * as actions from '../actions/ajax';

const epicMiddleware = createEpicMiddleware(actions.getDataEpic);

function reduxStore(routerMiddleware, initialState) {
  const store = createStore(
    reducers, initialState,
    applyMiddleware(epicMiddleware, routerMiddleware),
    window.devToolsExtension && window.devToolsExtension()
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      // We need to require for hot reloading to work properly.
      const nextReducer = require('../reducers');  // eslint-disable-line global-require

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

export default reduxStore;

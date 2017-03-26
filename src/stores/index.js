import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import reducers from '../reducers/rooms';
import * as actions from '../actions/ajax';

const epicMiddleware = createEpicMiddleware(actions.getDataEpic);
function reduxStore(initialState) {
  const store = createStore(
    reducers,
    { isLoading: false, isError: false, repositories: [], ...initialState },
    applyMiddleware(epicMiddleware), window.devToolsExtension && window.devToolsExtension()
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

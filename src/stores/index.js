import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux'
import { crudSaga } from 'redux-crud-store'
import ApiClient from '../apiClient'
import reducers from '../reducers';

const client = new ApiClient({ basePath: '/api' });
const crudMiddleware = createSagaMiddleware();

function reduxStore(routerMiddleware, initialState) {
  const store = createStore(
    reducers, initialState,
    applyMiddleware(crudMiddleware, routerMiddleware),
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

  crudMiddleware.run(crudSaga(client));

  return store;
}

export default reduxStore;

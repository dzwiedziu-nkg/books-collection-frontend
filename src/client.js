import 'rxjs';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import Root from './containers/Root';
import configureStore from './stores';


const history = createHistory();
const middleware = routerMiddleware(history);
const store = configureStore(middleware, {});

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextApp = require('./containers/Root').default; // eslint-disable-line global-require

    render(
      <AppContainer>
        <NextApp store={store} history={history} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}

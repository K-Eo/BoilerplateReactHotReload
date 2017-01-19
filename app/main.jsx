import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Route from 'react-router/lib/Route';
import Router from 'react-router/lib/Router';
import hashHistory from 'react-router/lib/hashHistory';

import 'style!css!sass!applicationStyles';

import App from 'App';
import configure from 'configureStore';

const store = configure();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}/>
    </Router>
  </Provider>,
  document.getElementById('app')
);

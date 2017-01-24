import * as redux from 'redux';
import thunk from 'redux-thunk';
import reduxImmutable from 'redux-immutable-state-invariant';

import appReducer from '../reducers/appReducer';

const globalInitialState = {};

export const configure = (initialState = globalInitialState) => {

  const reducer = redux.combineReducers({
    app: appReducer
  });

  let compose = null;

  if (process.env.NODE_ENV === 'production') {

    compose = redux.compose(
      redux.applyMiddleware(thunk)
    );

  } else {

    compose = redux.compose(
      redux.applyMiddleware(thunk, reduxImmutable()),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    );

  }

  return redux.createStore(reducer, initialState, compose);
};

export default configure;

import * as redux from 'redux';
import thunk from 'redux-thunk';

import appReducer from 'appReducer';
// import <reducer> from '<path>';

const globalInitialState = {};

export const configure = (initialState = globalInitialState) => {

  const reducer = redux.combineReducers({
    app: appReducer
  });

  const compose = redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );

  return redux.createStore(reducer, initialState, compose);
};

export default configure;

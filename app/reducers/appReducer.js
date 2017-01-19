import * as types from 'types';

const appInitialState = {};

const appReducer = (state = appInitialState, action: Object): void => {
  switch (action.type) {
    case types.APP:
      console.log('Reducer into action: ', action.type);
      return { ...state };
    default:
      return state;
  }
};

export default appReducer;

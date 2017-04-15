import {GET_CONFIG_DONE, GET_CONFIG_FAILED, GET_CONFIG_REQUESTED} from '../actions/const';

const initialState = {isLoading: false, isError: false, options: {}};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONFIG_REQUESTED:
      return { ...state, isLoading: true };
    case GET_CONFIG_DONE:
      let o = action.payload.reduce(function(acc, cur, i) {
        acc[cur['key']] = cur['value'];
        return acc;
      }, {});
      return { ...state, isLoading: false, options: o };
    case GET_CONFIG_FAILED:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};

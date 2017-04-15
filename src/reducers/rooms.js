/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import {} from '../actions/const';
import * as actions from '../actions/ajax';

const initialState = { isLoading: false, isError: false, repositories: [] };

export default function reducer(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  // const nextState = Object.assign({}, state);

  switch (action.type) {
    case actions.GET_DATA_REQUESTED:
      return { ...state, isLoading: true };
    case actions.GET_DATA_DONE:
      return { ...state, isLoading: false, repositories: action.payload };
    case actions.GET_DATA_FAILED:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
}

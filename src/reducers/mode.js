import { SET_EDIT_MODE } from '../actions/const';

const initialState = {edit: false};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EDIT_MODE:
      return { ...state, edit: action.edit };
    default:
      return state;
  }
};

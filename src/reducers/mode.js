import { SET_EDIT_MODE, SET_NOTIFY, CLEAR_NOTIFY } from '../actions/const';

const initialState = {edit: false, notify: null, notify_style: null};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EDIT_MODE:
      return { ...state, edit: action.edit };
    case SET_NOTIFY:
      return { ...state, notify: action.text, notify_style: action.style };
    case CLEAR_NOTIFY:
      return { ...state, notify: null, notify_style: null };
    default:
      return state;
  }
};

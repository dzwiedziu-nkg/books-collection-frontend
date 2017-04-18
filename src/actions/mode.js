import { SET_EDIT_MODE, SET_NOTIFY, CLEAR_NOTIFY } from './const';

export function setEditMode(edit) {
  return {
    type: SET_EDIT_MODE,
    edit
  };
}

export function setNotify(text, style) {
  return {
    type: SET_NOTIFY,
    text,
    style
  };
}

export function clearNotify(text, style) {
  return {
    type: CLEAR_NOTIFY,
    text,
    style
  };
}

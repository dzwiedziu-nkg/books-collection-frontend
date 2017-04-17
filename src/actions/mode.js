import { SET_EDIT_MODE } from './const';

export function setEditMode(edit) {
  return {
    type: SET_EDIT_MODE,
    edit
  };
}

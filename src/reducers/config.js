import { LOAD_CONFIG } from '../actions/const';

const initialState = {
  isLoading: true,
  BRAND_TITLE: 'Collection of books',
  ROOM_COLS: 2
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CONFIG:
      let config = { isLoading: false };
      for (let i = 0; i < action.configJson.length; i++) {
        const { id, value } = action.configJson[i];
        config[id] = value;
      }
      return { ...state, ...config };
    default:
      return state;
  }
};

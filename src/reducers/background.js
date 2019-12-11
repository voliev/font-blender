import { SET_BACKGROUND_COLOR, SET_DEFAULT_STATE } from "../constants";

const initialState = {
  color: "#fff"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BACKGROUND_COLOR:
      return {
        ...state,
        color: action.color
      };
    case SET_DEFAULT_STATE:
      return initialState;
    default:
      return state;
  }
};

export const getBackground = state => state.styles.present.background;
export const getBackgroundDefaultState = () => ({ ...initialState });

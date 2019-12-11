import { SET_DEFAULT_STATE, SET_FONT_SIZE, SET_TYPE_SCALE } from "../constants";

export const initialState = {
  fontSize: 16,
  scale: 1.414
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TYPE_SCALE:
      return {
        ...state,
        scale: action.scale
      };
    case SET_FONT_SIZE:
      return {
        ...state,
        fontSize: action.fontSize
      };
    case SET_DEFAULT_STATE:
      return initialState;
    default:
      return state;
  }
};

export const getTypeScale = state => state.styles.present.typeScale;
export const getTypeScaleDefaultState = () => ({ ...initialState });

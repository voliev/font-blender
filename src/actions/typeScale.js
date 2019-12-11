import {
  SET_DEFAULT_TYPE_SCALE_STATE,
  SET_FONT_SIZE,
  SET_TYPE_SCALE
} from "../constants";

export const setTypeScale = (scale = 1.414) => ({
  type: SET_TYPE_SCALE,
  scale
});

export const setFontSize = (fontSize = 16) => ({
  type: SET_FONT_SIZE,
  fontSize
});

export const setDefaultTypeScaleState = () => ({
  type: SET_DEFAULT_TYPE_SCALE_STATE
});

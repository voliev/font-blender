import {
  DISPLAY_SHOWCASE_FONT_PREVIEW,
  DISPLAY_SHOWCASE_TEXT,
  DISPLAY_STYLES
} from "../constants";
import { startFetchFont } from "../actions/fonts";
import { getFonts } from "../reducers/fonts";

export const displayShowcaseText = () => ({
  type: DISPLAY_SHOWCASE_TEXT
});

export const displayStyles = () => ({
  type: DISPLAY_STYLES
});

export const displayShowcaseFontPreview = family => ({
  type: DISPLAY_SHOWCASE_FONT_PREVIEW,
  family
});

export const startDisplayShowcaseFontPreview = family => {
  return (dispatch, getState) => {
    const state = getState();
    const fonts = getFonts(state);
    const font = fonts[family];

    if (font.fetched) {
      // Display showcase font if it has been fetched already
      dispatch(displayShowcaseFontPreview(family));
    } else {
      // Fetch showcase font and display it
      return dispatch(startFetchFont(family))
        .then(() => dispatch(displayShowcaseFontPreview(family)))
        .catch(() => {});
    }
  };
};

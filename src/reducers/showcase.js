import {
  DISPLAY_SHOWCASE_FONT_PREVIEW,
  DISPLAY_SHOWCASE_TEXT,
  DISPLAY_STYLES
} from "../constants";
import { getFonts } from "../reducers/fonts";

const initialState = {
  text: {
    isVisible: true
  },
  fontPreview: {
    isVisible: false,
    family: undefined
  },
  styles: {
    isVisible: false
  }
};

// This state object being used for updates in reducer fucntion
const showcaseState = {
  ...initialState,
  text: {
    isVisible: false
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_SHOWCASE_TEXT:
      return {
        ...showcaseState,
        text: {
          isVisible: true
        }
      };
    case DISPLAY_SHOWCASE_FONT_PREVIEW:
      return {
        ...showcaseState,
        fontPreview: {
          isVisible: true,
          family: action.family
        }
      };
    case DISPLAY_STYLES:
      return {
        ...showcaseState,
        styles: {
          isVisible: true
        }
      };
    default:
      return state;
  }
};

export const getPreviewFont = state => {
  const { family } = state.showcase.fontPreview;
  const fonts = getFonts(state);

  return { ...fonts[family] };
};

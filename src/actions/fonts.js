import WebFont from "webfontloader";
import { getFonts } from "../reducers/fonts";
import {
  GOOGLE_FONTS_API_ENDPOINT,
  FETCH_FONTS_DATA,
  FETCH_FONTS_DATA_FAILURE,
  FETCH_FONTS_DATA_SUCCESS,
  SET_FONTS,
  UPDATE_FONT
} from "../constants";

export const fetchFontsData = () => ({
  type: FETCH_FONTS_DATA
});

export const fetchFontsDataSuccess = () => ({
  type: FETCH_FONTS_DATA_SUCCESS
});

export const fetchFontsDataFailure = () => ({
  type: FETCH_FONTS_DATA_FAILURE
});

export const setFonts = fonts => ({
  type: SET_FONTS,
  fonts
});

export const startFetchFontsData = () => {
  return async dispatch => {
    const apiRequestURL = `${GOOGLE_FONTS_API_ENDPOINT}?key=${
      process.env.REACT_APP_GOOGLE_FONTS_API_KEY
    }&sort=popularity`;

    dispatch(fetchFontsData());

    try {
      const res = await fetch(apiRequestURL);
      const { items } = await res.json();
      dispatch(fetchFontsDataSuccess());

      const fonts = items.reduce((result, font) => {
        result[font.family] = {
          family: font.family,
          category: font.category,
          variants: font.variants,
          subsets: font.subsets,
          fetching: false,
          active: false,
          requested: false,
          prefetched: false,
          fetched: false
        };

        return result;
      }, {});

      return dispatch(setFonts(fonts));
    } catch (e) {
      dispatch(fetchFontsDataFailure());
      // TODO: Eject and replace service worker with custom one.
      //       Implement fonts' json data caching.
      return dispatch(setFonts({}));
    }
  };
};

export const updateFont = (family, updates) => ({
  type: UPDATE_FONT,
  family,
  updates
});

export const startFetchFont = (family, charRange = undefined) => {
  return (dispatch, getState) => {
    const state = getState();
    const fonts = getFonts(state);
    const font = fonts[family];
    const fetchFull = !charRange;
    const requestString = generateRequestString(font, fetchFull);
    const options = generateRequestOptions(
      requestString,
      charRange,
      dispatch,
      state
    );

    WebFont.load(options);

    const updatedState = getState();
    const updatedFonts = getFonts(updatedState);

    // For "then" chaining in selectedFonts.js async action creator
    return Promise.resolve(updatedFonts[family]);
  };
};

export const generateRequestString = (font, fetchFull = false) => {
  const { family, subsets, variants } = font;

  if (fetchFull) {
    return `${family}:${variants.join(",")}`;
  }

  const weight = variants.includes("regular")
    ? "400"
    : parseInt(variants[0], 10).toString();
  const subset = subsets.includes("latin") ? "latin" : subsets[0];

  return `${family}:${weight}:${subset}`;
};

export const generateRequestOptions = (request, chars, dispatch) => ({
  google: {
    families: [request],
    text: chars
  },
  classes: false,
  timeout: 10000,
  fontloading: getEventListener("fontloading", dispatch, chars),
  fontactive: getEventListener("fontactive", dispatch, chars),
  fontinactive: getEventListener("fontinactive", dispatch, chars)
});

export const getEventListener = (event, dispatch, charRange) => {
  const listeners = {
    fontloading: family => {
      const updates = Object.assign(
        { fetching: true },
        charRange ? { requested: true } : {}
      );
      dispatch(updateFont(family, updates));
    },
    fontactive: family => {
      const updates = Object.assign(
        { active: true, fetching: false },
        charRange ? { prefetched: true } : { fetched: true }
      );
      dispatch(updateFont(family, updates));
    },
    fontinactive: family => {
      const updates = Object.assign(
        { fetching: false },
        charRange ? { active: false } : {}
      );
      dispatch(updateFont(family, updates));
    }
  };

  return listeners[event];
};

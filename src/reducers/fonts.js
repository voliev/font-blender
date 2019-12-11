import { combineReducers } from "redux";
import {
  FETCH_FONTS_DATA,
  FETCH_FONTS_DATA_FAILURE,
  FETCH_FONTS_DATA_SUCCESS,
  SET_FONTS,
  UPDATE_FONT
} from "../constants";

export const fontsDataStatus = (state = "", action) => {
  switch (action.type) {
    case FETCH_FONTS_DATA:
      return "fetching";
    case FETCH_FONTS_DATA_SUCCESS:
      return "success";
    case FETCH_FONTS_DATA_FAILURE:
      return "failure";
    default:
      return state;
  }
};

const initialState = {};

export const all = (state = initialState, action) => {
  switch (action.type) {
    case SET_FONTS:
      return action.fonts;
    case UPDATE_FONT:
      return {
        ...state,
        [action.family]: {
          ...state[action.family],
          ...action.updates
        }
      };
    default:
      return state;
  }
};

export default combineReducers({
  all,
  fontsDataStatus
});

export const getFonts = state => state.fonts.all;
export const getFont = (state, family) => state.fonts.all[family];
export const getFontsDataStatus = state => state.fonts.fontsDataStatus;

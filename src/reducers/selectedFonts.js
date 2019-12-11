import undoable, { includeAction } from "redux-undo";
import {
  ADD_SELECTED_FONT,
  CLEAR_SELECTED_FONTS,
  REMOVE_FONT_FROM_SELECTED,
  UNDO_DESELECTED
} from "../constants";
import { getFonts } from "./fonts";

const initialState = [];

export const selectedFonts = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SELECTED_FONT:
      return [...state, action.family];
    case REMOVE_FONT_FROM_SELECTED:
      return state.filter(family => family !== action.family);
    case CLEAR_SELECTED_FONTS:
      return [];
    default:
      return state;
  }
};

export default undoable(selectedFonts, {
  limit: 1,
  filter: includeAction([REMOVE_FONT_FROM_SELECTED, CLEAR_SELECTED_FONTS]),
  undoType: UNDO_DESELECTED
});

export const getSelectedFontFamilies = state => state.selectedFonts.present;
export const getSelectedFonts = state => {
  const fonts = getFonts(state);

  return getSelectedFontFamilies(state).reduce((selected, family) => {
    selected[family] = fonts[family];
    return selected;
  }, {});
};
export const isSelected = (state, family) =>
  state.selectedFonts.present.includes(family);

import {
  ADD_SELECTED_FONT,
  CLEAR_SELECTED_FONTS,
  REMOVE_FONT_FROM_SELECTED,
  UNDO_DESELECTED
} from "../constants";
import { startFetchFont } from "./fonts";
import { addNotification, removeNotification } from "./notifications";
import { getFonts } from "../reducers/fonts";

export const addFontToSelected = family => ({
  type: ADD_SELECTED_FONT,
  family
});

export const removeFontFromSelected = family => ({
  type: REMOVE_FONT_FROM_SELECTED,
  family
});

export const clearSelectedFonts = () => ({
  type: CLEAR_SELECTED_FONTS
});

export const startAddFontToSelected = family => {
  return (dispatch, getState) => {
    const state = getState();
    const fonts = getFonts(state);
    const font = fonts[family];

    if (font.fetched) {
      // Add font to selected if it has been already fetchedselected list
      dispatch(addFontToSelected(family));
    } else {
      // Fetch font first than add it to selected
      return dispatch(startFetchFont(family))
        .then(() => dispatch(addFontToSelected(family)))
        .catch(() => {});
    }
  };
};

export const undoDeselected = () => ({
  type: UNDO_DESELECTED
});

export const startRemoveFontFromSelected = family => {
  return dispatch => {
    dispatch(removeFontFromSelected(family));

    const text = `${family} font family has been removed`;
    const group = "selectedFonts";
    // Add notification to display it with "undo" option
    dispatch(addNotification(text, group));
  };
};

export const startClearSelectedFonts = () => {
  return (dispatch, getState) => {
    const state = getState();
    const selectedFonts = [...state.selectedFonts.present];

    dispatch(clearSelectedFonts());

    const text =
      selectedFonts.length > 1
        ? `${selectedFonts.length} font families have been removed`
        : `${selectedFonts.length} font family have been removed`;
    const group = "selectedFonts";
    // Add notification to display it with "undo" option
    dispatch(addNotification(text, group));
  };
};

export const startUndoDeselected = () => {
  return dispatch => {
    // Undo deselection
    dispatch(undoDeselected());

    const group = "selectedFonts";

    // Remove notification to hide "undo" option
    dispatch(removeNotification(group));
  };
};

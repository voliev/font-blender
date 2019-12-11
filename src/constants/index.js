// *** ACTION TYPES ***

// Background
export const SET_BACKGROUND_COLOR = "SET_BACKGROUND_COLOR";

// Filteres
export const SET_CATEGORIES_FILTER = "SET_CATEGORIES_FILTER";
export const SET_SORTING_ORDER = "SET_SORTING_ORDER";
export const SET_SORTING_PARAM = "SET_SORTING_PARAM";
export const SET_TITLE_FILTER = "SET_TITLE_FILTER";

// Fonts
export const FETCH_FONTS_DATA = "FETCH_FONTS_DATA";
export const FETCH_FONTS_DATA_SUCCESS = "FETCH_FONTS_DATA_SUCCESS";
export const FETCH_FONTS_DATA_FAILURE = "FETCH_FONTS_DATA_FAILURE";
export const SET_FONTS = "SET_FONTS";
export const UPDATE_FONT = "UPDATE_FONT";

// Notifications
export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";

// Showcase
export const DISPLAY_SHOWCASE_TEXT = "DISPLAY_SHOWCASE_TEXT";
export const DISPLAY_STYLES = "DISPLAY_STYLES";
export const DISPLAY_SHOWCASE_FONT_PREVIEW = "DISPLAY_SHOWCASE_FONT_PREVIEW";

// Styles
export const SET_DEFAULT_STATE = "SET_DEFAULT_STATE";
export const UNDO_RESET = "UNDO_RESET";

// Text styles
export const SET_STYLES_INHERITANCE = "SET_STYLES_INHERITANCE";
export const UPDATE_ELEMENT_STYLES = "UPDATE_ELEMENT_STYLES";

// Selected fonts
export const ADD_SELECTED_FONT = "ADD_SELECTED_FONT";
export const CLEAR_SELECTED_FONTS = "CLEAR_SELECTED_FONTS";
export const REMOVE_FONT_FROM_SELECTED = "REMOVE_FONT_FROM_SELECTED";
export const UNDO_DESELECTED = "UNDO_DESELECTED";

// Type scale
export const SET_DEFAULT_TYPE_SCALE_STATE = "SET_DEFAULT_TYPE_SCALE_STATE";
export const SET_FONT_SIZE = "SET_FONT_SIZE";
export const SET_TYPE_SCALE = "SET_TYPE_SCALE";

// *** MISCELLANEOUS ***

// Google Fonts API endpoint URL
export const GOOGLE_FONTS_API_ENDPOINT =
  "https://www.googleapis.com/webfonts/v1/webfonts";
// Fonts' bundle size that should be prefetched
export const BUNDLE_SIZE = 50;
// Available text elements for styling
export const ELEMENTS = ["body", "h1", "h2", "h3", "h4", "li", "small"];
// Font's character range that needs to be prefetched
export const CHAR_RANGE =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
// Font showcase string
export const SHOWCASE_STRING =
  "That's the beauty of music. They can't get that from you...";
// Default showcase font size
export const DEFAULT_FONT_SIZE = 16;
// Available type scale values
export const SCALE_VALUES = {
  1.067: "Minor Second",
  1.125: "Major Second",
  1.2: "Minor Third",
  1.25: "Major Third",
  1.333: "Perfect Fourth",
  1.414: "Augmented Fourth",
  1.5: "Perfect Fifth",
  1.618: "Golden Ratio"
};
// Minimum gap between the color picker icon and viewport
// edge required to place the color picker
export const MIN_GAP = 300;
// Notification snackbar visibility timeout
export const TIMEOUT = 10000;

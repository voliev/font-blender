import { SET_BACKGROUND_COLOR } from "../constants";

export const setBackgroundColor = (color = "#fff") => ({
  type: SET_BACKGROUND_COLOR,
  color
});

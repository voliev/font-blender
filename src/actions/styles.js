import { addNotification, removeNotification } from "./notifications";
import { SET_DEFAULT_STATE, UNDO_RESET } from "../constants";

export const setDefaultStyles = () => ({
  type: SET_DEFAULT_STATE
});

export const undoReset = () => ({
  type: UNDO_RESET
});

export const startSetDefaultStyles = () => {
  return dispatch => {
    // Reset custom styles
    dispatch(setDefaultStyles());

    const text = "Styles has been reset";
    const group = "styles";
    // Add notification to display it with "undo" option
    dispatch(addNotification(text, group));
  };
};

export const startUndoReset = () => {
  return dispatch => {
    // Undo styles reset
    dispatch(undoReset());

    const group = "styles";
    // Remove corresponding notification with "undo" option
    dispatch(removeNotification(group));
  };
};

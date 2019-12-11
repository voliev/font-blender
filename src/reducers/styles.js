import { combineReducers } from "redux";
import undoable, { includeAction } from "redux-undo";
import typeScale from "../reducers/typeScale";
import textStyles from "../reducers/textStyles";
import background from "../reducers/background";
import { SET_DEFAULT_STATE, UNDO_RESET } from "../constants";

const styles = combineReducers({
  typeScale,
  textStyles,
  background
});

export default undoable(styles, {
  limit: 1,
  filter: includeAction(SET_DEFAULT_STATE),
  undoType: UNDO_RESET
});

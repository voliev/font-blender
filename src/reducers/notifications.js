import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "../constants";

const groups = ["selectedFonts", "styles", "clipboard"];

const initialState = groups.reduce((res, group) => {
  res[group] = {
    current: "",
    pending: ""
  };
  return res;
}, {});

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        [action.group]: {
          current: state[action.group].pending
            ? state[action.group].pending
            : state[action.group].current || action.text,
          pending: !state[action.group].current ? "" : action.text
        }
      };
    case REMOVE_NOTIFICATION:
      return {
        ...state,
        [action.group]: {
          current: state[action.group].pending,
          pending: ""
        }
      };
    default:
      return state;
  }
};

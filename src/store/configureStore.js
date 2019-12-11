import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import fonts from "../reducers/fonts";
import filters from "../reducers/filters";
import selectedFonts from "../reducers/selectedFonts";
import showcase from "../reducers/showcase";
import styles from "../reducers/styles";
import notifications from "../reducers/notifications";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      fonts,
      filters,
      selectedFonts,
      showcase,
      styles,
      notifications
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import App from "./components/App";
import configureStore from "./store/configureStore";
import { startFetchFontsData } from "./actions/fonts";
import "./index.css";

export const store = configureStore();

export const renderApp = () => {
  const jsx = (
    <Provider store={store}>
      <App />
    </Provider>
  );

  ReactDOM.render(jsx, document.getElementById("root"));

  store.dispatch(startFetchFontsData());
};

renderApp();

serviceWorker.register();

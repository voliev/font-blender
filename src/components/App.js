import React from "react";
import Header from "./header/Header";
import Main from "./Main";
import Notifications from "./notifications/Notifications";
import "./styles/App.css";

const App = () => (
  <div className="App">
    <Header />
    <Main />
    <Notifications />
  </div>
);

export default App;

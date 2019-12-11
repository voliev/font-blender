import React from "react";
import FontsPane from "./fontsPane/FontsPane";
import ShowcasePane from "./showcasePane/ShowcasePane";
import SettingsPane from "./settingsPane/SettingsPane";
import "./styles/Main.css";

const Main = () => (
  <main className="Main">
    <FontsPane />
    <ShowcasePane />
    <SettingsPane />
  </main>
);

export default Main;

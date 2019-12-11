import React from "react";
import TypeScaleContainer from "./TypeScaleContainer";
import Elements from "./Elements";
import Background from "./Background";
import SettingsPaneFooter from "./SettingsPaneFooter";
import "./styles/SettingsPane.css";

const SettingsPane = () => (
  <div className="SettingsPane">
    <TypeScaleContainer />
    <Elements />
    <Background />
    <SettingsPaneFooter />
  </div>
);

export default SettingsPane;

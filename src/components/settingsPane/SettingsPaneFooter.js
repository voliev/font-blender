import React from "react";
import isEqual from "lodash.isequal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import GetCSSButton from "./GetCSSButton";
import ResetButton from "./ResetButton";
import { getTypeScaleDefaultState } from "../../reducers/typeScale";
import { getTextStylesDefaultState } from "../../reducers/textStyles";
import { getBackgroundDefaultState } from "../../reducers/background";
import { isControlDisabled } from "../../utils";
import { startSetDefaultStyles } from "../../actions/styles";
import { displayStyles } from "../../actions/showcase";
import "./styles/SettingsPaneFooter.css";

export const SettingsPaneFooter = ({
  isGetStylesDisabled,
  isResetDisabled,
  setDefaultStyles,
  displayStyles
}) => (
  <div className="SettingsPaneFooter">
    <ResetButton
      disabled={isResetDisabled}
      resetButtonClickHandler={setDefaultStyles}
    />
    <GetCSSButton
      disabled={isGetStylesDisabled}
      getCSSButtonClickHandler={displayStyles}
    />
  </div>
);

SettingsPaneFooter.propTypes = {
  isResetDisabled: PropTypes.bool.isRequired,
  isGetStylesDisabled: PropTypes.bool.isRequired,
  setDefaultStyles: PropTypes.func.isRequired,
  displayStyles: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const stylesDefaults = {
    typeScale: getTypeScaleDefaultState(),
    textStyles: getTextStylesDefaultState(),
    background: getBackgroundDefaultState()
  };

  return {
    isResetDisabled: isControlDisabled(
      state,
      isEqual(state.styles.present, stylesDefaults)
    ),
    isGetStylesDisabled: isControlDisabled(state)
  };
};

const mapDispatchToProps = dispatch => ({
  setDefaultStyles: () => dispatch(startSetDefaultStyles()),
  displayStyles: () => dispatch(displayStyles())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPaneFooter);

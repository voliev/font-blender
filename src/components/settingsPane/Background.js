import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ColorPicker from "./ColorPicker";
import { isPropTypeHexColor, isControlDisabled } from "../../utils";
import { getBackground } from "../../reducers/background";
import { setBackgroundColor } from "../../actions/background";
import "./styles/Background.css";

export const Background = ({ background, disabled, setBackgroundColor }) => (
  <div className="Background">
    <p className="label">Background</p>
    <ColorPicker
      disabled={disabled}
      colorChangeHandler={setBackgroundColor}
      color={background.color}
    />
  </div>
);

Background.propTypes = {
  background: PropTypes.shape({
    color: isPropTypeHexColor
  }).isRequired,
  disabled: PropTypes.bool.isRequired,
  setBackgroundColor: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  background: getBackground(state),
  disabled: isControlDisabled(state)
});

const mapDispatchToProps = dispatch => ({
  setBackgroundColor: ({ hex }) => dispatch(setBackgroundColor(hex))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Background);

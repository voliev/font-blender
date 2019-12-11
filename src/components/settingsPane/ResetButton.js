import React from "react";
import PropTypes from "prop-types";
import "./styles/ResetButton.css";

const ResetButton = ({ disabled, resetButtonClickHandler }) => (
  <button
    className="ResetButton btn-no-background"
    disabled={disabled}
    onClick={resetButtonClickHandler}
    title="Reset styles"
    value="reset"
  >
    Reset
  </button>
);

ResetButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  resetButtonClickHandler: PropTypes.func.isRequired
};

export default ResetButton;

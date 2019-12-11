import React from "react";
import PropTypes from "prop-types";
import "./styles/PreviewFontSizeReset.css";

const PreviewFontSizeReset = ({ resetFontSizeHandler }) => (
  <button
    className="PreviewFontSizeReset btn-blue-rect"
    onClick={resetFontSizeHandler}
    value="reset"
    title="Reset font size"
  >
    Reset
  </button>
);

PreviewFontSizeReset.propTypes = {
  resetFontSizeHandler: PropTypes.func.isRequired
};

export default PreviewFontSizeReset;

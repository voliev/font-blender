import React, { Fragment } from "react";
import debounce from "lodash.debounce";
import PropTypes from "prop-types";
import "./styles/PreviewFontSizeInput.css";

const PreviewFontSizeInput = ({ fontSizeChangeHandler, value }) => (
  <Fragment>
    <label className="PreviewFontSizeInput label" htmlFor="preview-font-size">
      Font size (px)
    </label>
    <input
      className="PreviewFontSizeInput input"
      id="preview-font-size"
      type="number"
      name="font-size"
      min="1"
      max="100"
      value={value}
      onChange={debounce(fontSizeChangeHandler, 100, {
        leading: true
      })}
    />
  </Fragment>
);

PreviewFontSizeInput.propTypes = {
  fontSizeChangeHandler: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
};

export default PreviewFontSizeInput;

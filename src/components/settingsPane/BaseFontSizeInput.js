import React from "react";
import debounce from "lodash.debounce";
import PropTypes from "prop-types";
import "./styles/BaseFontSizeInput.css";

const BaseFontSizeInput = ({ disabled, value, fontSizeChangeHandler }) => (
  <div className="BaseFontSizeInput">
    <label className="label" htmlFor="base-font-size">
      Font size (px)
    </label>
    <input
      disabled={disabled}
      id="base-font-size"
      min="1"
      max="50"
      name="fontSize"
      onChange={debounce(fontSizeChangeHandler, 100, {
        leading: true
      })}
      type="number"
      value={value}
    />
  </div>
);

BaseFontSizeInput.propTypes = {
  disabled: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
  fontSizeChangeHandler: PropTypes.func.isRequired
};

export default React.memo(BaseFontSizeInput);

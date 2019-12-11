import React from "react";
import PropTypes from "prop-types";
import { SCALE_VALUES } from "../../constants";
import "./styles/ScaleValueSelectList.css";

const ScaleValueSelectList = ({ disabled, value, scaleChangeHandler }) => (
  <div className="ScaleValueSelectList">
    <label className="label" htmlFor="scale-value">
      Scale value
    </label>
    <select
      disabled={disabled}
      id="scale-value"
      name="scaleValue"
      onChange={scaleChangeHandler}
      value={value}
    >
      {Object.keys(SCALE_VALUES).map(scaleValue => (
        <option key={scaleValue} value={scaleValue}>
          {`${scaleValue} - ${SCALE_VALUES[scaleValue]}`}
        </option>
      ))}
    </select>
  </div>
);

ScaleValueSelectList.propTypes = {
  disabled: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
  scaleChangeHandler: PropTypes.func.isRequired
};

export default React.memo(ScaleValueSelectList);

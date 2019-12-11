import React from "react";
import PropTypes from "prop-types";
import "./styles/SortingParameters.css";

const SortingParameters = ({ sortingParamChangeHandler, value }) => (
  <select
    className="SortingParameters"
    id="sorting-param"
    name="param"
    onChange={sortingParamChangeHandler}
    title="Select sorting parameter"
    value={value}
  >
    {["popularity", "alphabetical"].map(param => (
      <option value={param === "alphabetical" ? "alpha" : param} key={param}>
        {param}
      </option>
    ))}
  </select>
);

SortingParameters.propTypes = {
  sortingParamChangeHandler: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default SortingParameters;

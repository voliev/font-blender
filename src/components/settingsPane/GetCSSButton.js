import React from "react";
import PropTypes from "prop-types";
import Code from "@material-ui/icons/CodeRounded";
import "./styles/GetCSSButton.css";

const GetCSSButton = ({ disabled, getCSSButtonClickHandler }) => (
  <button
    className="GetCSSButton btn-blue-rect"
    disabled={disabled}
    name="getStyles"
    onClick={getCSSButtonClickHandler}
    title="Get CSS"
    value="getStyles"
  >
    <span className="icon">
      <Code fontSize="small" />
    </span>
    Get CSS
  </button>
);

GetCSSButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  getCSSButtonClickHandler: PropTypes.func.isRequired
};

export default GetCSSButton;

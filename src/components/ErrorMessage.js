import React from "react";
import PropTypes from "prop-types";
import "./styles/ErrorMessage.css";

const ErrorMessage = ({ children }) => (
  <div className="ErrorMessage">{children}</div>
);

ErrorMessage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired
};

export default ErrorMessage;

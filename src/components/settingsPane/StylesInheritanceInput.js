import React from "react";
import CheckBoxOutlineBlank from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxOutlined from "@material-ui/icons/CheckBoxOutlined";
import PropTypes from "prop-types";
import "./styles/StylesInheritanceInput.css";

const StylesInheritanceInput = ({
  disabled,
  element,
  inheritStyles,
  stylesInheritanceChangeHandler
}) => (
  <div className="StylesInheritanceInput">
    <input
      className="inheritance-input"
      checked={inheritStyles}
      disabled={disabled}
      name="inheritStyles"
      id={`${element}-inherit-styles`}
      onChange={stylesInheritanceChangeHandler}
      type="checkbox"
      value={element}
    />
    <label className="label" htmlFor={`${element}-inherit-styles`}>
      <div className="checkbox-icon">
        {inheritStyles ? <CheckBoxOutlined /> : <CheckBoxOutlineBlank />}
      </div>
      Inherit <code className="code"> &lt;body&gt;</code> styles
    </label>
  </div>
);

StylesInheritanceInput.propTypes = {
  disabled: PropTypes.bool,
  element: PropTypes.string.isRequired,
  inheritStyles: PropTypes.bool.isRequired,
  stylesInheritanceChangeHandler: PropTypes.func.isRequired
};

export default React.memo(StylesInheritanceInput);

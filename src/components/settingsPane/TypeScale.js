import React, { Component } from "react";
import PropTypes from "prop-types";
import BaseFontSizeInput from "./BaseFontSizeInput";
import ScaleValueSelectList from "./ScaleValueSelectList";
import { numberInputChangeHandler } from "../../utils";
import "./styles/TypeScale.css";

class TypeScale extends Component {
  constructor() {
    super();

    this.handleFontSizeChange = this.handleFontSizeChange.bind(this);
    this.handleScaleChange = this.handleScaleChange.bind(this);
  }

  handleFontSizeChange(e) {
    numberInputChangeHandler(e.target.value, 16, 1, 100, fontSize => {
      this.props.setFontSize(fontSize);
    });
  }

  handleScaleChange(e) {
    const { value } = e.target;
    this.props.setTypeScale(parseFloat(value));
  }

  render() {
    const { disabled, typeScale } = this.props;

    return (
      <div className="TypeScale">
        <p className="group-label">Type Scale</p>
        <BaseFontSizeInput
          disabled={disabled}
          fontSizeChangeHandler={this.handleFontSizeChange}
          value={typeScale.fontSize}
        />
        <ScaleValueSelectList
          disabled={disabled}
          scaleChangeHandler={this.handleScaleChange}
          value={typeScale.scale}
        />
      </div>
    );
  }
}

TypeScale.propTypes = {
  typeScale: PropTypes.exact({
    fontSize: PropTypes.number.isRequired,
    scale: PropTypes.number.isRequired
  }).isRequired,
  disabled: PropTypes.bool.isRequired,
  setFontSize: PropTypes.func.isRequired,
  setTypeScale: PropTypes.func.isRequired
};

export default TypeScale;

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ColorPicker from "./ColorPicker";
import {
  isPropTypeHexColor,
  isControlDisabled,
  getPropertyValue
} from "../../utils";
import { getTextStyles } from "../../reducers/textStyles";
import { updateElementStyles } from "../../actions/textStyles";
import "./styles/ElementColor.css";

export class ElementColor extends Component {
  constructor() {
    super();

    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleColorChange({ hex }) {
    this.props.updateElementStyles(this.props.element, hex);
  }

  render() {
    const { color, disabled } = this.props;

    return (
      <div className="ElementColor">
        <p className="label">Color</p>
        <ColorPicker
          disabled={disabled}
          colorChangeHandler={this.handleColorChange}
          color={color}
        />
      </div>
    );
  }
}

ElementColor.propTypes = {
  color: isPropTypeHexColor,
  disabled: PropTypes.bool.isRequired,
  element: PropTypes.string.isRequired,
  updateElementStyles: PropTypes.func.isRequired
};

const mapStateToProps = (state, { element }) => {
  const textStyles = getTextStyles(state);

  return {
    color: getPropertyValue(textStyles, element, "color"),
    disabled: isControlDisabled(state, textStyles[element].inheritStyles),
    element
  };
};

const mapDispatchToProps = dispatch => ({
  updateElementStyles: (element, value) =>
    dispatch(updateElementStyles(element, "color", value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ElementColor);

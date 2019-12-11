import React, { Component } from "react";
import classNames from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import { SketchPicker } from "react-color";
import PropTypes from "prop-types";
import { MIN_GAP } from "../../constants";
import { isPropTypeHexColor } from "../../utils";
import "./styles/ColorPicker.css";

class ColorPicker extends Component {
  constructor() {
    super();

    this.containerRef = React.createRef();

    this.state = {
      displayColorPicker: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  handleClick() {
    this.setState(({ displayColorPicker }) => ({
      displayColorPicker: !displayColorPicker
    }));
  }

  handleOutsideClick() {
    this.setState({
      displayColorPicker: false
    });
  }

  getPickerPositionClass() {
    if (!this.containerRef.current) {
      return;
    }

    const viewportHeight = document.documentElement.clientHeight;
    const containerCoords = this.containerRef.current.getBoundingClientRect();
    const gap = viewportHeight - containerCoords.bottom;

    return gap > MIN_GAP ? "below" : "above";
  }

  getPicker() {
    if (!this.state.displayColorPicker) return null;

    const pickerPositionClass = this.getPickerPositionClass();
    const pickerClasses = classNames({
      picker: true,
      above: pickerPositionClass === "above",
      below: pickerPositionClass === "below"
    });

    const { color, colorChangeHandler } = this.props;
    return (
      <div className={pickerClasses}>
        <SketchPicker
          disableAlpha={true}
          color={color}
          onChangeComplete={colorChangeHandler}
        />
      </div>
    );
  }

  render() {
    const { color, disabled } = this.props;

    const componentClasses = classNames({
      ColorPicker: true,
      active: this.state.displayColorPicker,
      disabled
    });

    const colorPicker = this.getPicker();

    return (
      <OutsideClickHandler
        onOutsideClick={this.handleOutsideClick}
        disabled={!this.state.displayColorPicker}
      >
        <div className={componentClasses}>
          <div
            className="active-container"
            onClick={!disabled ? this.handleClick : null}
            ref={this.containerRef}
          >
            <div className="icon">
              <div className="color" style={{ background: color }} />
            </div>
          </div>
          {colorPicker}
        </div>
      </OutsideClickHandler>
    );
  }
}

ColorPicker.propTypes = {
  disabled: PropTypes.bool.isRequired,
  colorChangeHandler: PropTypes.func.isRequired,
  color: isPropTypeHexColor
};

export default ColorPicker;

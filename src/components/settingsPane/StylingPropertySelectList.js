import React, { Component } from "react";
import isEqual from "lodash.isequal";
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateElementStyles } from "../../actions/textStyles";
import "./styles/StylingPropertySelectList.css";

export class StylingPropertySelectList extends Component {
  constructor() {
    super();

    this.handleStylePropertyChange = this.handleStylePropertyChange.bind(this);
    this.getStylePropertyValueFromEvent = this.getStylePropertyValueFromEvent.bind(
      this
    );
  }

  handleStylePropertyChange(e) {
    const { element, property } = this.props;
    const value = this.getStylePropertyValueFromEvent(e);

    this.props.updateElementStyles(element, property, value);
  }

  getStylePropertyValueFromEvent(event) {
    const { selectedFonts, property } = this.props;
    const { value } = event.target;

    if (property === "font-family") {
      return selectedFonts[value] ? selectedFonts[value] : value;
    }

    if (property === "font-weight") {
      return parseInt(value, 10);
    }

    return value;
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.disabled !== nextProps.disabled) {
      return true;
    }

    if (this.props.value !== nextProps.value) {
      return true;
    }

    if (
      Object.keys(this.props.selectedFonts).length !==
      Object.keys(nextProps.selectedFonts).length
    ) {
      return true;
    }

    if (!isEqual(this.props.options, nextProps.options)) {
      return true;
    }

    return false;
  }

  render() {
    const { disabled, element, options, property, value } = this.props;
    const componentClasses = classNames({
      StylingPropertySelectList: true,
      disabled
    });

    return (
      <div className={componentClasses}>
        <label className="label" htmlFor={`${element}-${property}`}>
          {property.replace(/^\w{1}|-/gi, (match, idx) =>
            idx === 0 ? match.toUpperCase() : " "
          )}
        </label>
        <select
          className="select-list"
          disabled={disabled}
          id={`${element}-${property}`}
          name={property}
          onChange={this.handleStylePropertyChange}
          value={value}
        >
          {options ? (
            [
              property === "font-family" && (
                <option key="default" value="default">
                  sans-sefir
                </option>
              ),
              ...options.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))
            ]
          ) : (
            <option key="default" value="default">
              {value}
            </option>
          )}
        </select>
      </div>
    );
  }
}

StylingPropertySelectList.propTypes = {
  disabled: PropTypes.bool,
  element: PropTypes.string.isRequired,
  selectedFonts: PropTypes.objectOf(
    PropTypes.exact({
      family: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      variants: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      subsets: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      fetching: PropTypes.bool.isRequired,
      active: PropTypes.bool.isRequired,
      requested: PropTypes.bool.isRequired,
      prefetched: PropTypes.bool.isRequired,
      fetched: PropTypes.bool.isRequired
    }).isRequired
  ).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  property: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  updateElementStyles: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  updateElementStyles: (element, property, value) =>
    dispatch(updateElementStyles(element, property, value))
});

export default connect(
  undefined,
  mapDispatchToProps
)(StylingPropertySelectList);

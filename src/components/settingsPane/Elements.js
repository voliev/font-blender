import React, { Component } from "react";
import isEqual from "lodash.isequal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ELEMENTS } from "../../constants";
import StylingPropertySelectList from "./StylingPropertySelectList";
import StylesInheritanceInput from "./StylesInheritanceInput";
import ElementColor from "./ElementColor";
import { getSelectedFonts } from "../../reducers/selectedFonts";
import { getTextStyles } from "../../reducers/textStyles";
import {
  isControlDisabled,
  getPropertyOptions,
  getPropertyValue
} from "../../utils";
import { setStylesInheritance } from "../../actions/textStyles";
import { isPropTypeHexColor } from "../../utils";
import "./styles/Elements.css";

export class Elements extends Component {
  constructor() {
    super();

    this.handleStylesInheritanceChange = this.handleStylesInheritanceChange.bind(
      this
    );
  }

  handleStylesInheritanceChange(e) {
    const { value } = e.target;
    this.props.setStylesInheritance(value);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.disabled !== nextProps.disabled) {
      return true;
    }

    if (!isEqual(this.props.selectedFonts, nextProps.selectedFonts)) {
      return true;
    }

    if (!isEqual(this.props.textStyles, nextProps.textStyles)) {
      return true;
    }

    return false;
  }

  render() {
    const { disabled, selectedFonts, textStyles } = this.props;

    return (
      <div className="Elements">
        {ELEMENTS.map(element => (
          <div className="element" key={element}>
            <p className="element-label">&lt;{element}&gt;</p>

            {element !== "body" ? (
              <StylesInheritanceInput
                disabled={disabled}
                element={element}
                inheritStyles={textStyles[element].inheritStyles}
                stylesInheritanceChangeHandler={
                  this.handleStylesInheritanceChange
                }
              />
            ) : null}

            {["font-family", "font-style", "font-weight"].map(property => (
              <StylingPropertySelectList
                disabled={disabled}
                element={element}
                key={property}
                property={property}
                selectedFonts={selectedFonts}
                options={getPropertyOptions(
                  property,
                  element,
                  textStyles,
                  selectedFonts
                )}
                value={getPropertyValue(textStyles, element, property)}
              />
            ))}

            <ElementColor element={element} />
          </div>
        ))}
      </div>
    );
  }
}

const elementChecks = {
  fontFamily: PropTypes.string.isRequired,
  fontStyle: PropTypes.string.isRequired,
  fontWeight: PropTypes.number.isRequired,
  color: isPropTypeHexColor
};

Elements.propTypes = {
  disabled: PropTypes.bool,
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
  setStylesInheritance: PropTypes.func.isRequired,
  textStyles: PropTypes.exact(
    ELEMENTS.reduce((checks, element) => {
      if (element === "body") {
        checks[element] = PropTypes.exact(elementChecks).isRequired;
      } else {
        checks[element] = PropTypes.exact({
          inheritStyles: PropTypes.bool.isRequired,
          ...elementChecks
        });
      }

      return checks;
    }, {})
  ).isRequired
};

const mapStateToProps = state => ({
  disabled: isControlDisabled(state),
  selectedFonts: getSelectedFonts(state),
  textStyles: getTextStyles(state)
});

const mapDispatchToProps = dispatch => ({
  setStylesInheritance: element => dispatch(setStylesInheritance(element))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Elements);

import React, { Component } from "react";
import classNames from "classnames";
import AddCircleRounded from "@material-ui/icons/AddCircleRounded";
import SyncRounded from "@material-ui/icons/SyncRounded";
import CheckCircleRounded from "@material-ui/icons/CheckCircleRounded";
import PropTypes from "prop-types";
import "./styles/FontItemControl.css";

class FontItemControl extends Component {
  getFontStateFromProps() {
    const { active, requested, selected, fetching } = this.props;
    const stateOptions = {
      selected,
      active: active && !selected,
      fetch: !active && requested && !fetching
    };

    for (const state in stateOptions) {
      if (stateOptions[state]) {
        return state;
      }
    }
  }

  getControlIconFromFontState(fontState) {
    const icons = {
      fetch: <SyncRounded fontSize="default" />,
      active: <AddCircleRounded fontSize="default" />,
      selected: <CheckCircleRounded fontSize="default" />
    };

    return icons[fontState];
  }

  getTitleAttributeFromFontState(fontState) {
    const titleAttributes = {
      fetch: "Font has not been loaded. Try again",
      active: "Add to Selected",
      selected: "Deselect font"
    };

    const title = titleAttributes[fontState] || "Fetching...";

    return title;
  }

  render() {
    const {
      family,
      requested,
      prefetched,
      fetched,
      fetching,
      selected,
      fontSelectionDeselectionHandler,
      requestFont
    } = this.props;

    const componentClasses = classNames({
      FontItemControl: true,
      fetching
    });
    const btnClasses = classNames({
      btn: true,
      "btn-round-small": true,
      "add-circle": !selected && (prefetched || fetched),
      checked: selected && !fetching,
      sync: requested && !prefetched && !fetched
    });

    const fontState = this.getFontStateFromProps();

    return (
      <div className={componentClasses}>
        <button
          className={btnClasses}
          onClick={prefetched ? fontSelectionDeselectionHandler : requestFont}
          data-family={family}
          value={family}
          title={this.getTitleAttributeFromFontState(fontState)}
        >
          {this.getControlIconFromFontState(fontState)}
        </button>
      </div>
    );
  }
}

FontItemControl.propTypes = {
  family: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  requested: PropTypes.bool.isRequired,
  prefetched: PropTypes.bool.isRequired,
  fetched: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  fontSelectionDeselectionHandler: PropTypes.func.isRequired,
  requestFont: PropTypes.func.isRequired
};

export default FontItemControl;

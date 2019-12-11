import React, { Component } from "react";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutlineRounded";
import PropTypes from "prop-types";
import "./styles/SelectedFontItem.css";

class SelectedFontItem extends Component {
  constructor() {
    super();

    this.item = React.createRef();

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }

  handleButtonClick(e) {
    const { target } = e;

    if (target.closest("button")) {
      this.item.current.classList.remove("active");
    }
  }

  handleTransitionEnd(e) {
    e.persist();

    if (e.propertyName === "transform") {
      return;
    }

    const { target } = e;
    const { family, fontDeselectionHandler } = this.props;

    if (!target.classList.contains("active")) {
      fontDeselectionHandler(family);
    }
  }

  componentDidMount() {
    if (this.item.current) {
      this.item.current.classList.add("active");
    }
  }

  render() {
    const { family } = this.props;

    return (
      <li
        className="SelectedFontItem"
        onTransitionEnd={this.handleTransitionEnd}
        ref={this.item}
      >
        <p className="font-family">{family}</p>
        <button
          className="btn btn-round-small"
          onClick={this.handleButtonClick}
          title="Deselect font"
          value={family}
        >
          <RemoveIcon fontSize="default" />
        </button>
      </li>
    );
  }
}

SelectedFontItem.propTypes = {
  family: PropTypes.string.isRequired,
  fontDeselectionHandler: PropTypes.func.isRequired
};

export default SelectedFontItem;

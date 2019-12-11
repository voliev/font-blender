import React from "react";
import PropTypes from "prop-types";
import "./styles/UndoButton.css";

const UndoButton = ({ onClickHandler }) => (
  <button
    className="UndoButton btn"
    onClick={onClickHandler}
    value="undo"
    title="Undo"
  >
    Undo
  </button>
);

UndoButton.propTypes = {
  onClickHandler: PropTypes.func.isRequired
};

export default UndoButton;

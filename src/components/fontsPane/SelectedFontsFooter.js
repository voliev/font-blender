import React from "react";
import PropTypes from "prop-types";
import "./styles/SelectedFontsFooter.css";

const SelectedFontsFooter = ({ clearSelectedFontsButtonClickHandler }) => (
  <div className="SelectedFontsFooter">
    <button
      className="btn btn-no-background"
      onClick={clearSelectedFontsButtonClickHandler}
      title="Clear selected fonts"
      value="clear"
    >
      Clear
    </button>
  </div>
);

SelectedFontsFooter.propTypes = {
  clearSelectedFontsButtonClickHandler: PropTypes.func.isRequired
};

export default SelectedFontsFooter;

import React from "react";
import PropTypes from "prop-types";
import SelectedFontItem from "./SelectedFontItem";
import "./styles/SelectedFontsList.css";

const SelectedFontsList = ({ fontDeselectionHandler, selectedFonts }) => (
  <ul className="SelectedFontsList">
    {selectedFonts.map(family => (
      <SelectedFontItem
        family={family}
        key={family}
        fontDeselectionHandler={fontDeselectionHandler}
      />
    ))}
  </ul>
);

SelectedFontsList.propTypes = {
  fontDeselectionHandler: PropTypes.func.isRequired,
  selectedFonts: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default SelectedFontsList;

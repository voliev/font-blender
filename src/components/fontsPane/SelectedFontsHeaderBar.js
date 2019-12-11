import React from "react";
import classNames from "classnames";
import ExpandLessRounded from "@material-ui/icons/ExpandLessRounded";
import ExpandMoreRounded from "@material-ui/icons/ExpandMoreRounded";
import PropTypes from "prop-types";
import "./styles/SelectedFontsHeaderBar.css";

const SelectedFontsHeaderBar = ({
  folded,
  selectedFonts,
  headerBarClickHandler
}) => {
  const componentClasses = classNames({
    SelectedFontsHeaderBar: true,
    empty: selectedFonts.length === 0
  });

  return (
    <div className={componentClasses} onClick={headerBarClickHandler}>
      <p className="text">
        <span className="num">{selectedFonts.length}</span>
        <span>
          {" "}
          {selectedFonts.length === 1 ? "family" : "families"} selected
        </span>
      </p>
      <div className="icon">
        {folded ? <ExpandLessRounded /> : <ExpandMoreRounded />}
      </div>
    </div>
  );
};

SelectedFontsHeaderBar.propTypes = {
  folded: PropTypes.bool.isRequired,
  selectedFonts: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  headerBarClickHandler: PropTypes.func.isRequired
};

export default SelectedFontsHeaderBar;

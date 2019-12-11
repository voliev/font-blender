import React from "react";
import PropTypes from "prop-types";
import "./styles/FontPreviewInfo.css";

const FontPreviewInfo = ({ family, category, subsets }) => {
  const style = {
    fontFamily: `'${family}', ${category}`
  };

  return (
    <div className="FontPreviewInfo">
      <h2 className="heading" style={style}>
        {family}
      </h2>
      <div className="category">
        <h3 className="heading">Category</h3>
        <p className="category-name">{category}</p>
      </div>
      <div className="charsets">
        <h3 className="heading">Charsets</h3>
        <ul className="charsets-list">
          {subsets.map(subset => (
            <li key={subset}>{subset}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

FontPreviewInfo.propTypes = {
  family: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  subsets: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default FontPreviewInfo;

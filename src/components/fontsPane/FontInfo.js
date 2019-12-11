import React, { Fragment } from "react";
import classNames from "classnames";
import Preview from "@material-ui/icons/RemoveRedEyeRounded";
import PropTypes from "prop-types";

const FontInfo = ({
  family,
  category,
  subsets,
  variants,
  fetching,
  fontPreviewClickHandler
}) => {
  const fontFamilyStyle = {
    fontFamily: `'${family}', '${category}'`
  };

  const fontFamilyClasses = classNames({
    "family-name": true,
    fetching
  });

  return (
    <Fragment>
      <div className="family">
        <h4
          className={fontFamilyClasses}
          onClick={fontPreviewClickHandler}
          style={
            fetching
              ? {
                  fontFamily: `${category}`
                }
              : fontFamilyStyle
          }
          data-family={family}
          title="Preview font"
        >
          {family}
        </h4>
        <span className="preview-icon">
          <Preview fontSize="default" />
        </span>
      </div>
      <div className="category">{category}</div>
      <div className="charsets font_small">
        <span className="number">{subsets.length}</span> character{" "}
        {subsets.length === 1 ? "set" : "sets"}
      </div>
      <div className="styles font_small">
        <span className="number">{variants.length}</span>{" "}
        {variants.length === 1 ? "style" : "styles"}
      </div>
    </Fragment>
  );
};

FontInfo.propTypes = {
  family: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  variants: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  subsets: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  fetching: PropTypes.bool.isRequired,
  fontPreviewClickHandler: PropTypes.func.isRequired
};

export default FontInfo;

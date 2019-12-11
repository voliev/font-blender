import React from "react";
import PropTypes from "prop-types";
import { SHOWCASE_STRING } from "../../constants";
import { variantToStyle } from "../../utils";
import "./styles/FontPreviewVariants.css";

const FontPreviewVariants = ({ category, family, fontSize, variants }) => (
  <div className="FontPreviewVariants">
    {variants.map(variant => {
      const style = {
        example: `${variantToStyle(
          variant
        )} ${fontSize}px ${family}, ${category}`,
        value: `${variantToStyle(variant)} 16px ${family}, ${category}`
      };

      return (
        <dl className="variant" key={variant}>
          {
            <dt className="variant-value" style={{ font: style.value }}>
              {variant}
            </dt>
          }
          <dd className="variant-example" style={{ font: style.example }}>
            {SHOWCASE_STRING}
          </dd>
        </dl>
      );
    })}
  </div>
);

FontPreviewVariants.propTypes = {
  category: PropTypes.string.isRequired,
  family: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired,
  variants: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default FontPreviewVariants;

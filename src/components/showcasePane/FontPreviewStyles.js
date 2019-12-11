import React, { Component } from "react";
import PropTypes from "prop-types";
import { DEFAULT_FONT_SIZE } from "../../constants";
import PreviewFontSizeInput from "./PreviewFontSizeInput";
import PreviewFontSizeReset from "./PreviewFontSizeReset";
import FontPreviewVariants from "./FontPreviewVariants";
import { numberInputChangeHandler } from "../../utils";
import "./styles/FontPreviewStyles.css";

class FontPreviewStyles extends Component {
  constructor() {
    super();

    this.state = {
      fontSize: DEFAULT_FONT_SIZE
    };

    this.handleFontSizeChange = this.handleFontSizeChange.bind(this);
    this.handleResetFontSize = this.handleResetFontSize.bind(this);
  }

  handleFontSizeChange(e) {
    numberInputChangeHandler(e.target.value, 16, 1, 100, fontSize => {
      this.setState({ fontSize });
    });
  }

  handleResetFontSize() {
    this.resetFontSize();
  }

  resetFontSize() {
    this.setState({
      fontSize: DEFAULT_FONT_SIZE
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.family !== this.props.family) {
      this.resetFontSize();
    }
  }

  render() {
    const { family, category, variants } = this.props;

    const { fontSize } = this.state;

    return (
      <div className="FontPreviewStyles">
        <h3 className="heading">Styles</h3>
        <div className="font-size-controls">
          <PreviewFontSizeInput
            fontSizeChangeHandler={this.handleFontSizeChange}
            value={fontSize}
          />
          <PreviewFontSizeReset
            resetFontSizeHandler={this.handleResetFontSize}
          />
        </div>
        <FontPreviewVariants
          category={category}
          family={family}
          fontSize={fontSize}
          variants={variants}
        />
      </div>
    );
  }
}

FontPreviewStyles.propTypes = {
  category: PropTypes.string.isRequired,
  family: PropTypes.string.isRequired,
  variants: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default FontPreviewStyles;

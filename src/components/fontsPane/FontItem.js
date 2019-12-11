import React, { PureComponent } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { CHAR_RANGE } from "../../constants";
import FontInfo from "./FontInfo";
import FontItemControl from "./FontItemControl";
import "./styles/FontItem.css";

class FontItem extends PureComponent {
  constructor() {
    super();

    this.fontItem = React.createRef();

    this.state = {
      fontItem: undefined
    };

    this.requestFont = this.requestFont.bind(this);
    this.handleFontSelectionDeselection = this.handleFontSelectionDeselection.bind(
      this
    );
    this.handleFontPreviewClick = this.handleFontPreviewClick.bind(this);
  }

  requestFont() {
    this.props.fetchFont(this.props.font.family, CHAR_RANGE);
  }

  handleFontSelectionDeselection(e) {
    const { value } = e.currentTarget;
    !this.props.selected
      ? this.props.addFontToSelected(value)
      : this.props.removeFontFromSelected(value);
  }

  handleFontPreviewClick(e) {
    const { family } = e.currentTarget.dataset;
    this.props.startDisplayShowcaseFontPreview(family);
  }

  componentDidUpdate() {
    if (this.props.isVisible && !this.props.font.requested) {
      this.requestFont();
    }
  }

  componentDidMount() {
    this.setState({ fontItem: this.fontItem.current });
  }

  render() {
    const { font, selected, previewFontFamily } = this.props;

    const componentClasses = classNames({
      FontItem: true,
      selected,
      fetching: font.fetching,
      blank: !font.requested,
      preview: font.family === previewFontFamily
    });

    return (
      <li className={componentClasses} ref={this.fontItem}>
        <FontInfo
          {...font}
          fontPreviewClickHandler={this.handleFontPreviewClick}
        />
        <FontItemControl
          {...font}
          selected={selected}
          fontSelectionDeselectionHandler={this.handleFontSelectionDeselection}
          requestFont={this.requestFont}
        />
      </li>
    );
  }
}

FontItem.propTypes = {
  font: PropTypes.exact({
    family: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    variants: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    subsets: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    fetching: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
    requested: PropTypes.bool.isRequired,
    prefetched: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool,
  previewFontFamily: PropTypes.string,
  fetchFont: PropTypes.func.isRequired,
  addFontToSelected: PropTypes.func.isRequired,
  removeFontFromSelected: PropTypes.func.isRequired,
  startDisplayShowcaseFontPreview: PropTypes.func.isRequired
};

export default FontItem;

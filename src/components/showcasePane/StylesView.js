import React, { Component } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import css from "react-syntax-highlighter/dist/languages/hljs/css";
import docco from "react-syntax-highlighter/dist/styles/hljs/docco";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CopyToClipboardButton from "./CopyToClipboardButton";
import template from "../../template/styles";
import { isPropTypeHexColor } from "../../utils";
import { ELEMENTS } from "../../constants";
import { getFonts } from "../../reducers/fonts";
import "./styles/StylesView.css";

export class StylesView extends Component {
  componentDidMount() {
    SyntaxHighlighter.registerLanguage("css", css);
  }

  shouldComponentUpdate() {
    // Prevents unnecessary re-rendering on redux fonts update.
    // Since styles disabled from any updates when StylesView
    // component is displayed, they do not trigger any re-rendering
    return false;
  }

  render() {
    const { fonts, styles } = this.props;
    const target = "code-snippet";

    return (
      <div className="StylesView">
        <SyntaxHighlighter
          language="css"
          style={docco}
          customStyle={{
            whiteSpace: "pre-wrap",
            borderRadius: "6px",
            padding: "2rem"
          }}
          children={template(styles, fonts)}
          id={target}
        />
        <div className="controls">
          <CopyToClipboardButton target={target} />
        </div>
      </div>
    );
  }
}

const elementChecks = {
  fontFamily: PropTypes.string.isRequired,
  fontStyle: PropTypes.string.isRequired,
  fontWeight: PropTypes.number.isRequired,
  color: isPropTypeHexColor
};

StylesView.propTypes = {
  fonts: PropTypes.objectOf(
    PropTypes.exact({
      family: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      variants: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      subsets: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      fetching: PropTypes.bool.isRequired,
      active: PropTypes.bool.isRequired,
      requested: PropTypes.bool.isRequired,
      prefetched: PropTypes.bool.isRequired,
      fetched: PropTypes.bool.isRequired
    }).isRequired
  ).isRequired,
  styles: PropTypes.exact({
    typeScale: PropTypes.exact({
      fontSize: PropTypes.number.isRequired,
      scale: PropTypes.number.isRequired
    }).isRequired,
    textStyles: PropTypes.exact(
      ELEMENTS.reduce((checks, element) => {
        if (element === "body") {
          checks[element] = PropTypes.exact(elementChecks).isRequired;
        } else {
          checks[element] = PropTypes.exact({
            inheritStyles: PropTypes.bool.isRequired,
            ...elementChecks
          });
        }

        return checks;
      }, {})
    ).isRequired,
    background: PropTypes.shape({
      color: isPropTypeHexColor
    }).isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  fonts: getFonts(state),
  styles: state.styles.present
});

export default connect(mapStateToProps)(StylesView);

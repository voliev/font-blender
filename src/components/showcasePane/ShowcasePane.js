import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SampleText from "./SampleText";
import ShowcasePaneHeader from "./ShowcasePaneHeader";
import FontPreview from "./FontPreview";
import StylesView from "./StylesView";
import "./styles/ShowcasePane.css";

export const ShowcasePane = ({
  textIsVisible,
  fontPreviewIsVisible,
  stylesIsVisible
}) => (
  <div className="ShowcasePane">
    {(textIsVisible && <SampleText />) || (
      <Fragment>
        <ShowcasePaneHeader />
        {(stylesIsVisible && <StylesView />) ||
          (fontPreviewIsVisible && <FontPreview />)}
      </Fragment>
    )}
  </div>
);

ShowcasePane.propTypes = {
  textIsVisible: PropTypes.bool.isRequired,
  fontPreviewIsVisible: PropTypes.bool.isRequired,
  stylesIsVisible: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  textIsVisible: state.showcase.text.isVisible,
  fontPreviewIsVisible: state.showcase.fontPreview.isVisible,
  stylesIsVisible: state.showcase.styles.isVisible
});

export default connect(mapStateToProps)(ShowcasePane);

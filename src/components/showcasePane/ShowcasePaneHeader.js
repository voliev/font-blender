import React from "react";
import ArrowBackRounded from "@material-ui/icons/ArrowBackRounded";
import PropTypes from "prop-types";
import { displayShowcaseText } from "../../actions/showcase";
import { connect } from "react-redux";
import "./styles/ShowcasePaneHeader.css";

export const ShowcasePaneHeader = ({ displayShowcaseText }) => (
  <div className="ShowcasePaneHeader">
    <button
      className="btn btn-round-big"
      onClick={displayShowcaseText}
      title="Back to the sample text"
    >
      <ArrowBackRounded />
    </button>
  </div>
);

ShowcasePaneHeader.propTypes = {
  displayShowcaseText: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  displayShowcaseText: () => dispatch(displayShowcaseText())
});

export default connect(
  undefined,
  mapDispatchToProps
)(ShowcasePaneHeader);

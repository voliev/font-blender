import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BUNDLE_SIZE } from "../../constants";
import createFilteredFontsSelector from "../../selectors/fonts";
import Spinner from "../Spinner";
import VisibleFonts from "./VisibleFonts";
import ErrorMessage from "../ErrorMessage";
import ErrorOutline from "@material-ui/icons/ErrorOutlineRounded";
import { startFetchFontsData } from "../../actions/fonts";
import { getFonts, getFontsDataStatus } from "../../reducers/fonts";
import { getFilters } from "../../reducers/filters";
import "./styles/FontsList.css";

export class FontsList extends Component {
  constructor() {
    super();

    this.state = {
      bundleLimit: BUNDLE_SIZE
    };
    this.adjustBundleSize = this.adjustBundleSize.bind(this);
    this.handleFontsDataRequest = this.handleFontsDataRequest.bind(this);
  }

  adjustBundleSize(isVisible) {
    if (!isVisible) {
      return;
    }

    const { listMaxLength } = this.props;

    this.setState(({ bundleLimit }) => {
      const nextBundleLimit =
        bundleLimit + BUNDLE_SIZE > listMaxLength
          ? listMaxLength
          : bundleLimit + BUNDLE_SIZE;

      return {
        bundleLimit: nextBundleLimit
      };
    });
  }

  handleFontsDataRequest() {
    this.props.fetchFontsData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filteredFonts.length !== this.props.filteredFonts.length) {
      this.setState({
        bundleLimit: BUNDLE_SIZE
      });
    }
  }

  render() {
    const { fonts, filteredFonts, fontsDataStatus } = this.props;
    const { bundleLimit } = this.state;

    const visibleFonts = filteredFonts
      .slice(0, bundleLimit)
      .map(family => fonts[family]);

    const componentClasses = classNames({
      FontsList: true,
      fetching: fontsDataStatus === "" || fontsDataStatus === "fetching",
      error: fontsDataStatus === "failure"
    });

    return (
      <div className={componentClasses}>
        {(fontsDataStatus === "" || fontsDataStatus === "fetching") && (
          <Spinner />
        )}
        {fontsDataStatus === "success" && (
          <VisibleFonts
            adjustBundleSize={this.adjustBundleSize}
            visibleFonts={visibleFonts}
          />
        )}
        {fontsDataStatus === "failure" && (
          <ErrorMessage>
            <div className="msg">
              <ErrorOutline fontSize="large" />
              <p className="text">Fonts are not available.</p>
              <p className="text">The list has not been loaded.</p>
            </div>
            <button
              className="btn btn-blue-rect"
              onClick={this.handleFontsDataRequest}
              title="Get Fonts"
            >
              Try again
            </button>
          </ErrorMessage>
        )}
      </div>
    );
  }
}

FontsList.propTypes = {
  fetchFontsData: PropTypes.func.isRequired,
  filteredFonts: PropTypes.arrayOf(PropTypes.string).isRequired,
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
  fontsDataStatus: PropTypes.oneOf(["", "fetching", "success", "failure"]),
  listMaxLength: PropTypes.number.isRequired
};

const filteredFontsSelector = createFilteredFontsSelector();

const mapStateToProps = state => {
  const fonts = getFonts(state);
  const filters = getFilters(state);
  const filteredFonts = filteredFontsSelector(fonts, filters);
  const fontsDataStatus = getFontsDataStatus(state);

  return {
    fontsDataStatus,
    filteredFonts,
    fonts,
    listMaxLength: Object.keys(fonts).length
  };
};

const mapDispatchToProps = dispatch => ({
  fetchFontsData: () => dispatch(startFetchFontsData())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FontsList);

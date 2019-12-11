import React, { Component, Fragment } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import FontPreviewInfo from "./FontPreviewInfo";
import FontPreviewStyles from "./FontPreviewStyles";
import ErrorMessage from "../ErrorMessage";
import ErrorOutline from "@material-ui/icons/ErrorOutlineRounded";
import { startFetchFont } from "../../actions/fonts";
import { getPreviewFont } from "../../reducers/showcase";
import "./styles/FontPreview.css";

export class FontPreview extends Component {
  constructor() {
    super();

    // Show spinner by default on component mount
    this.state = { showSpinner: true };

    this.handleTryAgainButtonClick = this.handleTryAgainButtonClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Hide spinner if WebFontLoader callback (either
    // "fontactive" or "fontinactive") has been invoked
    if (prevProps.fetching && !this.props.fetching) {
      this.setState({ showSpinner: false });
    }

    // Show spinner if preview font family
    // has changed and it has not been fetched yet
    if (prevProps.family !== this.props.family && !this.props.fetched) {
      this.setState({ showSpinner: true });
    }
  }

  handleTryAgainButtonClick() {
    this.setState({ showSpinner: true });
    this.props.fetchFont(this.props.family);
  }

  render() {
    const { category, family, fetched, subsets, variants } = this.props;
    const componentClasses = classNames({
      FontPreview: true,
      fetching: this.state.showSpinner,
      error: !this.state.showSpinner && !fetched
    });

    return (
      <div className={componentClasses}>
        {this.state.showSpinner ? (
          <Spinner />
        ) : fetched ? (
          <Fragment>
            <FontPreviewInfo
              category={category}
              family={family}
              subsets={subsets}
            />
            <FontPreviewStyles
              category={category}
              family={family}
              variants={variants}
            />
          </Fragment>
        ) : (
          <ErrorMessage>
            <div className="test-wrapper">
              <div className="msg">
                <ErrorOutline fontSize="large" />
                <p className="text">Preview is unavailable.</p>
                <p className="text">The font has not been loaded.</p>
              </div>
              <button
                className="btn btn-blue-rect"
                onClick={this.handleTryAgainButtonClick}
              >
                Try again
              </button>
            </div>
          </ErrorMessage>
        )}
      </div>
    );
  }
}

FontPreview.propTypes = {
  category: PropTypes.string.isRequired,
  family: PropTypes.string.isRequired,
  fetched: PropTypes.bool.isRequired,
  fetchFont: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  subsets: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  variants: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

const mapStateToProps = state => getPreviewFont(state);

const mapDispatchToProps = dispatch => ({
  fetchFont: family => dispatch(startFetchFont(family))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FontPreview);

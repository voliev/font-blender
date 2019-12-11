import React, { Component, Fragment } from "react";
import classNames from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import PropTypes from "prop-types";
import SelectedFontsHeaderBar from "./SelectedFontsHeaderBar";
import SelectedFontsList from "./SelectedFontsList";
import SelectedFontsFooter from "./SelectedFontsFooter";
import "./styles/SelectedFonts.css";

class SelectedFonts extends Component {
  constructor() {
    super();

    this.state = {
      stage: 0
    };

    this.main = React.createRef();

    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleHeaderBarClick = this.handleHeaderBarClick.bind(this);
    this.handleFontDeselection = this.handleFontDeselection.bind(this);
    this.handleClearSelectedFontsButtonClick = this.handleClearSelectedFontsButtonClick.bind(
      this
    );
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }

  getLifecycleStage() {
    const stages = {
      0: "empty",
      1: "folded",
      2: "unfolding",
      3: "active",
      4: "folding",
      5: "folding-to-clear"
    };

    return stages[this.state.stage];
  }

  handleOutsideClick(e) {
    const { target } = e;
    const stage = this.getLifecycleStage();

    if (target.value !== "undo" && stage === "active") {
      this.setState({
        stage: 4
      });
    }
  }

  handleHeaderBarClick(e) {
    if (!e.target.closest(".SelectedFontsHeaderBar")) {
      return;
    }

    const stage = this.getLifecycleStage();

    if (stage === "folded") {
      this.setState({
        stage: 2
      });
    }

    if (stage === "active") {
      this.setState({
        stage: 4
      });
    }
  }

  handleFontDeselection(family) {
    const stage = this.getLifecycleStage();
    const { removeFontFromSelected, selectedFonts } = this.props;

    if (selectedFonts.length === 1 && stage === "active") {
      this.setState({
        stage: 5
      });
    }

    if (selectedFonts.length > 1 && stage === "active") {
      removeFontFromSelected(family);
    }
  }

  handleClearSelectedFontsButtonClick(e) {
    const { value } = e.target;
    const stage = this.getLifecycleStage();

    if (value === "clear" && stage === "active") {
      this.setState({
        stage: 5
      });
    }
  }

  handleTransitionEnd(e) {
    const { propertyName, target } = e;
    const classesArr = target.className.split(" ");
    const hasCorrespondingClass = classesArr.some(cn => cn === "SelectedFonts");

    if (propertyName !== "transform" && !hasCorrespondingClass) {
      return;
    }

    const stage = this.getLifecycleStage();
    const {
      clearSelectedFonts,
      removeFontFromSelected,
      selectedFonts
    } = this.props;

    if (stage === "unfolding") {
      this.setState({
        stage: 3
      });
    }

    if (stage === "folding") {
      this.setState({
        stage: 1
      });
    }

    if (stage === "folding-to-clear") {
      if (this.props.selectedFonts.length === 1) {
        removeFontFromSelected(selectedFonts[0]);
      } else {
        clearSelectedFonts();
      }

      this.setState({
        stage: 0
      });
    }
  }

  setComponentsCSSTransform() {
    const stage = this.getLifecycleStage();

    switch (stage) {
      case "unfolding":
        return {
          transform: `translateY(-${this.main.current.clientHeight}px)`
        };
      case "folding":
      case "folding-to-clear":
        return {
          transform: `translateY(${this.main.current.clientHeight}px)`
        };
      default:
        return {};
    }
  }

  componentDidUpdate({ selectedFonts: prevSelectedFonts }) {
    const { selectedFonts } = this.props;
    if (prevSelectedFonts.length === 0 && selectedFonts.length > 0) {
      this.setState({
        stage: 1
      });
    }

    if (prevSelectedFonts.length > 0 && selectedFonts.length === 0) {
      this.setState({
        stage: 0
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { selectedFonts } = this.props;
    const { selectedFonts: nextSelectedFonts } = nextProps;

    return (
      selectedFonts.length !== nextSelectedFonts.length ||
      this.state.stage !== nextState.stage
    );
  }

  render() {
    const { stage } = this.state;
    const { selectedFonts } = this.props;

    const componentClasses = classNames({
      SelectedFonts: true,
      [this.getLifecycleStage()]: true
    });

    const componentStyles = this.setComponentsCSSTransform();

    return (
      <Fragment>
        <div
          className={componentClasses}
          onTransitionEnd={this.handleTransitionEnd}
          style={componentStyles}
          title={
            (stage === 0 && "Select fonts first") ||
            (stage === 1 && "Click to Expand") ||
            (stage === 3 && "Click to Fold") ||
            ""
          }
        >
          <OutsideClickHandler
            disabled={selectedFonts.length === 0 || stage === 0 || stage === 1}
            onOutsideClick={this.handleOutsideClick}
          >
            <SelectedFontsHeaderBar
              folded={stage < 3}
              headerBarClickHandler={this.handleHeaderBarClick}
              selectedFonts={selectedFonts}
            />
            {selectedFonts.length > 0 ? (
              <div className="main" ref={this.main}>
                <SelectedFontsList
                  fontDeselectionHandler={this.handleFontDeselection}
                  selectedFonts={selectedFonts}
                />
                <SelectedFontsFooter
                  clearSelectedFontsButtonClickHandler={
                    this.handleClearSelectedFontsButtonClick
                  }
                />
              </div>
            ) : null}
          </OutsideClickHandler>
        </div>
        <div className="overlay" />
      </Fragment>
    );
  }
}

SelectedFonts.propTypes = {
  selectedFonts: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  removeFontFromSelected: PropTypes.func.isRequired,
  clearSelectedFonts: PropTypes.func.isRequired
};

export default SelectedFonts;

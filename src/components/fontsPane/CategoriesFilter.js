import React, { Component } from "react";
import classNames from "classnames";
import FilterList from "@material-ui/icons/FilterList";
import OutsideClickHandler from "react-outside-click-handler";
import CategoriesList from "./CategoriesList";
import "./styles/CategoriesFilter.css";

class CategoriesFilter extends Component {
  constructor() {
    super();

    this.state = {
      stage: 0
    };

    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  getLifecycleStage() {
    const stages = {
      0: "inactive",
      1: "fade-in",
      2: "active",
      3: "fade-out"
    };

    return stages[this.state.stage];
  }

  handleButtonClick() {
    this.setState(({ stage }) => ({
      stage: ++stage
    }));
  }

  handleOutsideClick() {
    const stage = this.getLifecycleStage();

    if (stage !== "inactive") {
      this.setState({
        stage: 3
      });
    }
  }

  handleAnimationEnd(e) {
    const { animationName } = e;
    const stage = this.getLifecycleStage();

    if (animationName === "fadeIn" && stage === "fade-in") {
      this.setState(({ stage }) => ({
        stage: ++stage
      }));
    }

    if (animationName === "fadeOut" && stage === "fade-out") {
      this.setState({
        stage: 0
      });
    }
  }

  render() {
    const stage = this.getLifecycleStage();
    const buttonClasses = classNames({
      btn: true,
      "btn-round-big": true,
      active: stage === "fade-in" || stage === "active"
    });

    return (
      <OutsideClickHandler
        onOutsideClick={this.handleOutsideClick}
        disabled={stage === "inactive"}
      >
        <div className="CategoriesFilter">
          <button
            className={buttonClasses}
            onClick={this.handleButtonClick}
            title="Select categories"
          >
            <FilterList />
          </button>
          {stage !== "inactive" ? (
            <CategoriesList
              animationEndHandler={this.handleAnimationEnd}
              stage={stage}
            />
          ) : null}
        </div>
      </OutsideClickHandler>
    );
  }
}

export default CategoriesFilter;

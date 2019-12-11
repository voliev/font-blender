import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SortingParameters from "./SortingParameters";
import SortingOrder from "./SortingOrder";
import { setSortingParam, setSortingOrder } from "../../actions/filters";
import "./styles/SortingFilter.css";

export class SortingFilter extends Component {
  constructor() {
    super();

    this.handleSortingParamChange = this.handleSortingParamChange.bind(this);
    this.handleSortingOrderChange = this.handleSortingOrderChange.bind(this);
  }

  handleSortingParamChange(e) {
    const { value } = e.target;
    this.props.setSortingParam(value);
  }

  handleSortingOrderChange(e) {
    const { value } = e.currentTarget;
    this.props.setSortingOrder(value);
  }

  render() {
    const { sorting } = this.props;

    return (
      <div className="SortingFilter">
        <SortingParameters
          sortingParamChangeHandler={this.handleSortingParamChange}
          value={sorting.param}
        />
        <SortingOrder
          sortingOrderChangeHandler={this.handleSortingOrderChange}
          value={sorting.order}
        />
      </div>
    );
  }
}

SortingFilter.propTypes = {
  sorting: PropTypes.exact({
    param: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired
  }).isRequired,
  setSortingParam: PropTypes.func.isRequired,
  setSortingOrder: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  sorting: state.filters.sorting
});

const mapDispatchToProps = dispatch => ({
  setSortingParam: param => dispatch(setSortingParam(param)),
  setSortingOrder: order => dispatch(setSortingOrder(order))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortingFilter);

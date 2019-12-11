import React from "react";
import ArrowDownwardRounded from "@material-ui/icons/ArrowDownwardRounded";
import ArrowUpwardRounded from "@material-ui/icons/ArrowUpwardRounded";
import PropTypes from "prop-types";
import "./styles/SortingOrder.css";

const SortingOrder = ({ sortingOrderChangeHandler, value }) => (
  <div className="SortingOrder">
    <button
      className="btn btn-round-big"
      onClick={sortingOrderChangeHandler}
      value={value}
      title="Change sorting order"
    >
      {value === "asc" ? <ArrowDownwardRounded /> : <ArrowUpwardRounded />}
    </button>
  </div>
);

SortingOrder.propTypes = {
  sortingOrderChangeHandler: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default SortingOrder;

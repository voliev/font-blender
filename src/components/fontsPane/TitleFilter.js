import React, { Component } from "react";
import classNames from "classnames";
import debounce from "lodash.debounce";
import ClearOutlined from "@material-ui/icons/ClearOutlined";
import Search from "@material-ui/icons/Search";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setTitleFilter } from "../../actions/filters";
import "./styles/TitleFilter.css";

export class TitleFilter extends Component {
  constructor() {
    super();

    this.handleTitleFilterChange = this.handleTitleFilterChange.bind(this);
    this.handleClearTitleFilter = this.handleClearTitleFilter.bind(this);
  }

  handleTitleFilterChange(e) {
    e.persist();

    if (e.target) {
      const { value } = e.target;

      this.props.setTitleFilter(value);
    }
  }

  handleClearTitleFilter() {
    this.props.setTitleFilter();
  }

  render() {
    const iconClasses = classNames({
      icon: true,
      clickable: !!this.props.title
    });

    return (
      <div className="TitleFilter">
        <input
          aria-label="Filter by font family title"
          className="text-input"
          name="title"
          onChange={debounce(this.handleTitleFilterChange, 300, {
            leading: true
          })}
          placeholder="Search"
          type="text"
          value={this.props.title}
        />
        <button
          className={iconClasses}
          onClick={this.handleClearTitleFilter}
          disabled={this.props.title === ""}
          title="Clear"
        >
          {this.props.title.length > 0 ? <ClearOutlined /> : <Search />}
        </button>
      </div>
    );
  }
}

TitleFilter.propTypes = {
  title: PropTypes.string.isRequired,
  setTitleFilter: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  title: state.filters.title
});

const mapDispatchToProps = dispatch => ({
  setTitleFilter: (title = "") => dispatch(setTitleFilter(title))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleFilter);

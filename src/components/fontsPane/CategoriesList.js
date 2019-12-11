import React, { Component } from "react";
import classNames from "classnames";
import CheckBoxOutlineBlank from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxOutlined from "@material-ui/icons/CheckBoxOutlined";
import PropTypes from "prop-types";
import { setCategoriesFilter } from "../../actions/filters";
import { connect } from "react-redux";
import "./styles/CategoriesList.css";

export class CategoriesList extends Component {
  constructor() {
    super();

    this.first = React.createRef();

    this.handleCategoriesFilterChange = this.handleCategoriesFilterChange.bind(
      this
    );
  }

  handleCategoriesFilterChange(e) {
    const { value } = e.target;
    this.props.setCategoriesFilter(value);
  }

  componentDidMount() {
    this.first.current.focus();
  }

  render() {
    const { animationEndHandler, categories, stage } = this.props;

    const listClasses = classNames({
      CategoriesList: true,
      "fade-in": stage === "fade-in",
      "fade-out": stage === "fade-out"
    });

    return (
      <ul className={listClasses} onAnimationEnd={animationEndHandler}>
        {Object.keys(categories).map((category, idx) => (
          <li
            className="list-item"
            key={category}
            ref={idx === 0 ? this.first : null}
          >
            <label className="label" htmlFor={category}>
              {categories[category] ? (
                <CheckBoxOutlined />
              ) : (
                <CheckBoxOutlineBlank />
              )}
              <input
                checked={categories[category]}
                className="input"
                id={category}
                name="categories"
                onChange={this.handleCategoriesFilterChange}
                type="checkbox"
                value={category}
              />
              {category.replace(/\b\w|\W/g, match =>
                match === "-" ? " " : match.toUpperCase()
              )}
            </label>
          </li>
        ))}
      </ul>
    );
  }
}

CategoriesList.propTypes = {
  animationEndHandler: PropTypes.func.isRequired,
  categories: PropTypes.objectOf(PropTypes.bool).isRequired,
  setCategoriesFilter: PropTypes.func.isRequired,
  stage: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  categories: state.filters.categories
});

const mapDispatchToProps = dispatch => ({
  setCategoriesFilter: category => dispatch(setCategoriesFilter(category))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesList);

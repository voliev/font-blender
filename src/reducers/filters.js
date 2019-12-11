import {
  SET_CATEGORIES_FILTER,
  SET_TITLE_FILTER,
  SET_SORTING_ORDER,
  SET_SORTING_PARAM
} from "../constants";

const initialState = {
  title: "",
  categories: {
    serif: true,
    "sans-serif": true,
    display: true,
    monospace: true,
    handwriting: true
  },
  sorting: {
    param: "popularity",
    order: "asc"
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TITLE_FILTER:
      return {
        ...state,
        title: action.title
      };
    case SET_CATEGORIES_FILTER:
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.category]: !state.categories[action.category]
        }
      };
    case SET_SORTING_PARAM:
      return {
        ...state,
        sorting: {
          ...state.sorting,
          param: action.param
        }
      };
    case SET_SORTING_ORDER:
      return {
        ...state,
        sorting: {
          ...state.sorting,
          order: action.order === "asc" ? "des" : "asc"
        }
      };
    default:
      return state;
  }
};

export const getFilters = state => state.filters;

import {
  SET_CATEGORIES_FILTER,
  SET_SORTING_ORDER,
  SET_SORTING_PARAM,
  SET_TITLE_FILTER
} from "../constants";

export const setTitleFilter = (title = "") => ({
  type: SET_TITLE_FILTER,
  title
});

export const setCategoriesFilter = category => ({
  type: SET_CATEGORIES_FILTER,
  category
});

export const setSortingParam = param => ({
  type: SET_SORTING_PARAM,
  param
});

export const setSortingOrder = order => ({
  type: SET_SORTING_ORDER,
  order
});

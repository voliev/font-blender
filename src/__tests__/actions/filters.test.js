import {
  setTitleFilter,
  setCategoriesFilter,
  setSortingParam,
  setSortingOrder
} from "../../actions/filters";
import {
  SET_TITLE_FILTER,
  SET_CATEGORIES_FILTER,
  SET_SORTING_PARAM,
  SET_SORTING_ORDER
} from "../../constants";

it("should generate title filter action object", () => {
  const title = "Roboto";
  const action = setTitleFilter(title);

  expect(action).toEqual({
    type: SET_TITLE_FILTER,
    title
  });
});

it("should generate title filter action object if title is `undefined`", () => {
  const action = setTitleFilter();

  expect(action).toEqual({
    type: SET_TITLE_FILTER,
    title: ""
  });
});

it("should generate categories filter action object", () => {
  const category = "display";
  const action = setCategoriesFilter(category);

  expect(action).toEqual({
    type: SET_CATEGORIES_FILTER,
    category
  });
});

it("should generate sorting param action object", () => {
  const param = "alpha";
  const action = setSortingParam(param);

  expect(action).toEqual({
    type: SET_SORTING_PARAM,
    param
  });
});

it("should generate sorting order action object", () => {
  const order = "des";
  const action = setSortingOrder(order);

  expect(action).toEqual({
    type: SET_SORTING_ORDER,
    order
  });
});

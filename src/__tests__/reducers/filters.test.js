import filtersReducer from "../../reducers/filters";
import {
  SET_CATEGORIES_FILTER,
  SET_TITLE_FILTER,
  SET_SORTING_ORDER,
  SET_SORTING_PARAM
} from "../../constants";
import filters from "../../fixtures/filters";

it("should set default state", () => {
  const state = filtersReducer(undefined, { type: "@@INIT" });

  expect(state).toEqual(filters);
});

it("should set title filter", () => {
  const state = filtersReducer(filters, {
    type: SET_TITLE_FILTER,
    title: "Roboto"
  });

  expect(state.title).toBe("Roboto");

  const updatedState = filtersReducer(state, {
    type: SET_TITLE_FILTER,
    title: "Lato"
  });

  expect(updatedState.title).toBe("Lato");
});

it("should set categories filter", () => {
  const state = filtersReducer(filters, {
    type: SET_CATEGORIES_FILTER,
    category: "sans-serif"
  });

  expect(state.categories["sans-serif"]).toBeFalsy();

  const updatedState = filtersReducer(state, {
    type: SET_CATEGORIES_FILTER,
    category: "sans-serif"
  });

  expect(updatedState.categories["sans-serif"]).toBeTruthy();
});

it("should set sorting parameter", () => {
  const state = filtersReducer(filters, {
    type: SET_SORTING_PARAM,
    param: "alpha"
  });

  expect(state.sorting.param).toBe("alpha");

  const updatedState = filtersReducer(state, {
    type: SET_SORTING_PARAM,
    param: "popularity"
  });

  expect(updatedState.sorting.param).toBe("popularity");
});

it("should set sorting order", () => {
  const state = filtersReducer(filters, {
    type: SET_SORTING_ORDER,
    order: "asc"
  });

  expect(state.sorting.order).toBe("des");

  const updatedState = filtersReducer(state, {
    type: SET_SORTING_ORDER,
    order: "des"
  });

  expect(updatedState.sorting.order).toBe("asc");
});

import React from "react";
import { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";
import SortingFilterConnected, { SortingFilter } from "../SortingFilter";
import { SET_SORTING_ORDER, SET_SORTING_PARAM } from "../../../constants";
import state from "../../../fixtures/state";
import filters from "../../../fixtures/filters";

const setup = (renderFn = shallow, propsUpdates = {}, connected = false) => {
  if (connected) {
    const mockStore = configureStore();
    const store = mockStore(state);

    return {
      store,
      wrapper: renderFn(<SortingFilterConnected store={store} />)
    };
  }

  const props = {
    sorting: filters.sorting,
    setSortingParam: jest.fn(),
    setSortingOrder: jest.fn(),
    ...propsUpdates
  };

  return {
    ...props,
    wrapper: renderFn(<SortingFilter {...props} />)
  };
};

afterEach(() => {
  jest.clearAllMocks();
});

it("should render without crashing", () => {
  const { wrapper } = setup();

  expect(wrapper).toMatchSnapshot();
});

it("should receive corresponding props", () => {
  const { sorting, setSortingOrder, setSortingParam, wrapper } = setup(mount);

  expect(typeof wrapper.prop("sorting")).toBe("object");
  expect(wrapper.prop("sorting")).toEqual(sorting);

  expect(typeof wrapper.prop("setSortingParam")).toBe("function");
  expect(wrapper.prop("setSortingParam")).toBe(setSortingParam);

  expect(typeof wrapper.prop("setSortingOrder")).toBe("function");
  expect(wrapper.prop("setSortingOrder")).toBe(setSortingOrder);
});

it("should handle sorting parameter change", () => {
  const { wrapper, setSortingParam } = setup();

  wrapper.instance().handleSortingParamChange({
    target: {
      value: "alpha"
    }
  });

  expect(setSortingParam).toHaveBeenCalledTimes(1);
  expect(setSortingParam).toHaveBeenCalledWith("alpha");
});

it("should handle sorting parameter change", () => {
  const { wrapper, setSortingOrder } = setup();

  wrapper.instance().handleSortingOrderChange({
    currentTarget: {
      value: "des"
    }
  });

  expect(setSortingOrder).toHaveBeenCalledTimes(1);
  expect(setSortingOrder).toHaveBeenCalledWith("des");
});

it("should dispatch an action", () => {
  const { wrapper, store } = setup(mount, undefined, true);

  wrapper.find(SortingFilter).prop("setSortingParam")("alpha");

  const actions = store.getActions();

  expect(actions).toContainEqual({
    type: SET_SORTING_PARAM,
    param: "alpha"
  });
});

it("should dispatch an action", () => {
  const { wrapper, store } = setup(mount, undefined, true);

  wrapper.find(SortingFilter).prop("setSortingOrder")("des");

  const actions = store.getActions();

  expect(actions).toContainEqual({
    type: SET_SORTING_ORDER,
    order: "des"
  });
});

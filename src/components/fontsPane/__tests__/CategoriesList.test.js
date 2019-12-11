import React from "react";
import { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";
import CheckBoxOutlineBlank from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxOutlined from "@material-ui/icons/CheckBoxOutlined";
import CategoriesListConnected, { CategoriesList } from "../CategoriesList";
import { SET_CATEGORIES_FILTER } from "../../../constants";
import filters from "../../../fixtures/filters";

const setup = (renderFn = shallow, propsOverrides = {}, connected = false) => {
  const props = {
    categories: { ...filters.categories },
    stage: "fade-in",
    animationEndHandler: jest.fn(),
    setCategoriesFilter: jest.fn(),
    ...propsOverrides
  };

  if (connected) {
    const mockStore = configureStore();
    const store = mockStore({ filters });

    return {
      store,
      wrapper: shallow(
        <CategoriesListConnected
          animationEndHandler={props.animationEndHandler}
          stage={props.stage}
          store={store}
        />
      )
    };
  }

  return {
    ...props,
    wrapper: renderFn(<CategoriesList {...props} />)
  };
};

it("should render without crashing", () => {
  const { wrapper } = setup(mount);

  expect(wrapper).toMatchSnapshot();
});

it("should receive corresponding props", () => {
  const {
    animationEndHandler,
    categories,
    setCategoriesFilter,
    stage,
    wrapper
  } = setup(mount);

  expect(typeof wrapper.prop("categories")).toBe("object");
  expect(wrapper.prop("categories")).toEqual(categories);

  expect(typeof wrapper.prop("setCategoriesFilter")).toBe("function");
  expect(wrapper.prop("setCategoriesFilter")).toBe(setCategoriesFilter);

  expect(typeof wrapper.prop("animationEndHandler")).toBe("function");
  expect(wrapper.prop("animationEndHandler")).toBe(animationEndHandler);

  expect(typeof wrapper.prop("stage")).toBe("string");
  expect(wrapper.prop("stage")).toBe(stage);
});

it("should set corresponding component classes", () => {
  const { wrapper } = setup(mount);

  expect(wrapper.find("ul").hasClass("CategoriesList")).toBeTruthy();
  expect(wrapper.find("ul").hasClass("fade-in")).toBeTruthy();

  wrapper.setProps({
    stage: "active"
  });

  expect(wrapper.find("ul").hasClass("CategoriesList")).toBeTruthy();
  expect(wrapper.find("ul").hasClass("fade-in")).toBeFalsy();

  wrapper.setProps({
    stage: "fade-out"
  });

  expect(wrapper.find("ul").hasClass("CategoriesList")).toBeTruthy();
  expect(wrapper.find("ul").hasClass("fade-out")).toBeTruthy();
});

it("should handle input change", () => {
  const { wrapper, setCategoriesFilter } = setup(mount);
  const category = "serif";
  const event = {
    target: { value: category }
  };

  wrapper.find('input[value="serif"]').simulate("change", event);

  expect(setCategoriesFilter).toHaveBeenCalledTimes(1);
  expect(setCategoriesFilter).toHaveBeenCalledWith(category);
});

it("should dispatch an action", () => {
  const { store, wrapper } = setup(shallow, undefined, true);

  wrapper.prop("setCategoriesFilter")("serif");

  const actions = store.getActions();

  expect(actions).toContainEqual({
    type: SET_CATEGORIES_FILTER,
    category: "serif"
  });
});

it("should set corresponding checkbox icon", () => {
  const { wrapper, categories } = setup(mount);

  expect(wrapper.find(CheckBoxOutlined).length).toBe(5);
  expect(wrapper.find(CheckBoxOutlineBlank).length).toBe(0);

  wrapper.setProps({
    categories: {
      ...categories,
      serif: false
    }
  });

  expect(wrapper.find(CheckBoxOutlined).length).toBe(4);
  expect(wrapper.find(CheckBoxOutlineBlank).length).toBe(1);

  wrapper.setProps({
    categories: {
      ...categories,
      serif: false,
      "sans-serif": false,
      display: false,
      monospace: false,
      handwriting: false
    }
  });

  expect(wrapper.find(CheckBoxOutlined).length).toBe(0);
  expect(wrapper.find(CheckBoxOutlineBlank).length).toBe(5);
});

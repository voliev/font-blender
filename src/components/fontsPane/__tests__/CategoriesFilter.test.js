import React from "react";
import { mount, shallow } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import OutsideClickHandler from "react-outside-click-handler";
import CategoriesFilter from "../CategoriesFilter";
import filters from "../../../fixtures/filters";

const setup = (renderFn = shallow, provideStore = false) => {
  if (provideStore) {
    const mockStore = configureStore();
    const store = mockStore({ filters });

    return {
      wrapper: renderFn(
        <Provider store={store}>
          <CategoriesFilter />
        </Provider>
      )
    };
  }

  return {
    handleButtonClick: jest.spyOn(
      CategoriesFilter.prototype,
      "handleButtonClick"
    ),
    handleOutsideClick: jest.spyOn(
      CategoriesFilter.prototype,
      "handleOutsideClick"
    ),
    handleAnimationEnd: jest.spyOn(
      CategoriesFilter.prototype,
      "handleAnimationEnd"
    ),
    wrapper: renderFn(<CategoriesFilter />)
  };
};

afterEach(() => {
  jest.clearAllMocks();
});

it("should render without crashing", () => {
  const { wrapper } = setup();

  expect(wrapper).toMatchSnapshot();
});

it("should set corresponding button classes", () => {
  const { wrapper } = setup();

  expect(wrapper.find("button").hasClass("btn")).toBeTruthy();
  expect(wrapper.find("button").hasClass("active")).toBeFalsy();

  wrapper.setState({ stage: 1 });

  expect(wrapper.find("button").hasClass("btn")).toBeTruthy();
  expect(wrapper.find("button").hasClass("active")).toBeTruthy();

  wrapper.setState({ stage: 2 });

  expect(wrapper.find("button").hasClass("btn")).toBeTruthy();
  expect(wrapper.find("button").hasClass("active")).toBeTruthy();

  wrapper.setState({ stage: 4 });

  expect(wrapper.find("button").hasClass("btn")).toBeTruthy();
  expect(wrapper.find("button").hasClass("active")).toBeFalsy();
});

it("should change stage on button click", () => {
  const { wrapper } = setup(shallow);

  expect(wrapper.state("stage")).toBe(0);

  wrapper.find("button").prop("onClick")();

  expect(wrapper.state("stage")).toBe(1);
});

it("should call handler on button click", () => {
  const { wrapper, handleButtonClick } = setup();

  wrapper.find("button").simulate("click");

  expect(handleButtonClick).toHaveBeenCalledTimes(1);
});

it("should handle click outside of the filter", () => {
  const { wrapper, handleOutsideClick } = setup();

  wrapper.setState({ stage: 1 });

  expect(wrapper.state("stage")).toBe(1);

  wrapper.find(OutsideClickHandler).prop("onOutsideClick")();

  expect(handleOutsideClick).toHaveBeenCalledTimes(1);
  expect(wrapper.state("stage")).toBe(3);
});

it("should not change the state when the filter is inactive", () => {
  const { wrapper, handleOutsideClick } = setup();

  wrapper.find(OutsideClickHandler).prop("onOutsideClick")();

  expect(handleOutsideClick).toHaveBeenCalledTimes(1);
  expect(wrapper.state("stage")).toBe(0);
});

it("should change state on button click", () => {
  const { wrapper } = setup(mount, true);

  expect(wrapper.find(CategoriesFilter).state().stage).toBe(0);

  wrapper.find("button").simulate("click");

  expect(wrapper.find(CategoriesFilter).state().stage).toBe(1);
});

it("should handle animation end", () => {
  const { wrapper } = setup();

  wrapper.setState({ stage: 1 });
  wrapper.instance().handleAnimationEnd({
    animationName: "fadeIn"
  });

  expect(wrapper.state("stage")).toBe(2);

  wrapper.setState({ stage: 3 });
  wrapper.instance().handleAnimationEnd({
    animationName: "fadeOut"
  });

  expect(wrapper.state("stage")).toBe(0);
});

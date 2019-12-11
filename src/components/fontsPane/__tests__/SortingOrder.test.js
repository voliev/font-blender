import React from "react";
import { mount, shallow } from "enzyme";
import ArrowDownwardRounded from "@material-ui/icons/ArrowDownwardRounded";
import ArrowUpwardRounded from "@material-ui/icons/ArrowUpwardRounded";
import SortingOrder from "../SortingOrder";

const setup = (renderFn = shallow, propsOverrides = {}) => {
  const props = {
    value: "asc",
    sortingOrderChangeHandler: jest.fn(),
    ...propsOverrides
  };

  return {
    ...props,
    wrapper: renderFn(<SortingOrder {...props} />)
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
  const { wrapper, value, sortingOrderChangeHandler } = setup(mount);

  expect(typeof wrapper.prop("value")).toBe("string");
  expect(wrapper.prop("value")).toBe(value);
  expect(typeof wrapper.prop("sortingOrderChangeHandler")).toBe("function");
  expect(wrapper.prop("sortingOrderChangeHandler")).toBe(
    sortingOrderChangeHandler
  );
});

it("should set corresponding value on initial render", () => {
  const { wrapper } = setup(mount);

  expect(wrapper.prop("value")).toBe("asc");
});

it("should call handler parameter on button click", () => {
  const { wrapper, sortingOrderChangeHandler } = setup();

  const event = {
    currentTarget: { value: "des" }
  };
  wrapper.find("button").simulate("click", event);

  expect(sortingOrderChangeHandler).toHaveBeenCalled();
  expect(sortingOrderChangeHandler).toHaveBeenCalledTimes(1);
  expect(sortingOrderChangeHandler).toHaveBeenCalledWith(event);
});

it("should set corresponding icon depending on value", () => {
  const { wrapper } = setup();

  expect(wrapper.find(ArrowDownwardRounded).length).toBe(1);
  expect(wrapper.find(ArrowUpwardRounded).length).toBe(0);

  wrapper.setProps({ value: "des" });

  expect(wrapper.find(ArrowDownwardRounded).length).toBe(0);
  expect(wrapper.find(ArrowUpwardRounded).length).toBe(1);
});

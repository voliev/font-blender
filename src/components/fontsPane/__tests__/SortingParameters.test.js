import React from "react";
import { mount, shallow } from "enzyme";
import SortingParameters from "../SortingParameters";

const setup = (renderFn = shallow, propsOverrides = {}) => {
  const props = {
    value: "popularity",
    sortingParamChangeHandler: jest.fn(),
    ...propsOverrides
  };

  return {
    ...props,
    wrapper: renderFn(<SortingParameters {...props} />)
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
  const { wrapper, value, sortingParamChangeHandler } = setup(mount);

  expect(typeof wrapper.prop("value")).toBe("string");
  expect(wrapper.prop("value")).toBe(value);
  expect(typeof wrapper.prop("sortingParamChangeHandler")).toBe("function");
  expect(wrapper.prop("sortingParamChangeHandler")).toBe(
    sortingParamChangeHandler
  );
});

it("should set corresponding value on initial render", () => {
  const { wrapper } = setup();

  expect(wrapper.prop("value")).toBe("popularity");
});

it("should call handler parameter on value change", () => {
  const { wrapper, sortingParamChangeHandler } = setup();

  const event = {
    target: { value: "alpha" }
  };
  wrapper.find("select").simulate("change", event);

  expect(sortingParamChangeHandler).toHaveBeenCalled();
  expect(sortingParamChangeHandler).toHaveBeenCalledTimes(1);
  expect(sortingParamChangeHandler).toHaveBeenCalledWith(event);
});

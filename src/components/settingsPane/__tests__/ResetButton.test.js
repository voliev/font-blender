import React from "react";
import { mount, shallow } from "enzyme";
import ResetButton from "../ResetButton";

const setup = (renderFn = shallow, propsOverrides = {}) => {
  const props = {
    disabled: false,
    resetButtonClickHandler: jest.fn(),
    ...propsOverrides
  };

  return {
    ...props,
    wrapper: renderFn(<ResetButton {...props} />)
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
  const { disabled, resetButtonClickHandler, wrapper } = setup(mount);

  expect(typeof wrapper.prop("disabled")).toBe("boolean");
  expect(wrapper.prop("disabled")).toBe(disabled);

  expect(typeof wrapper.prop("resetButtonClickHandler")).toBe("function");
  expect(wrapper.prop("resetButtonClickHandler")).toBe(resetButtonClickHandler);
});

it("should handle button click", () => {
  const { resetButtonClickHandler, wrapper } = setup();

  wrapper.find("button").simulate("click");

  expect(resetButtonClickHandler).toHaveBeenCalledTimes(1);
});

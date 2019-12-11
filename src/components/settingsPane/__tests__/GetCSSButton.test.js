import React from "react";
import { mount, shallow } from "enzyme";
import GetCSSButton from "../GetCSSButton";

const setup = (renderFn = shallow, propsOverrides = {}) => {
  const props = {
    disabled: false,
    getCSSButtonClickHandler: jest.fn(),
    ...propsOverrides
  };

  return {
    ...props,
    wrapper: renderFn(<GetCSSButton {...props} />)
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
  const { disabled, getCSSButtonClickHandler, wrapper } = setup(mount);

  expect(typeof wrapper.prop("disabled")).toBe("boolean");
  expect(wrapper.prop("disabled")).toBe(disabled);

  expect(typeof wrapper.prop("getCSSButtonClickHandler")).toBe("function");
  expect(wrapper.prop("getCSSButtonClickHandler")).toBe(
    getCSSButtonClickHandler
  );
});

it("should handle button click", () => {
  const { getCSSButtonClickHandler, wrapper } = setup();

  wrapper.find("button").simulate("click");

  expect(getCSSButtonClickHandler).toHaveBeenCalledTimes(1);
});

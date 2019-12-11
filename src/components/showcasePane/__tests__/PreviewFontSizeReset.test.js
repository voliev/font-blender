import React from "react";
import { mount, shallow } from "enzyme";
import PreviewFontSizeReset from "../PreviewFontSizeReset";

const setup = (renderFn = shallow, propsOverrides = {}) => {
  const props = {
    resetFontSizeHandler: jest.fn(),
    ...propsOverrides
  };

  return {
    ...props,
    wrapper: renderFn(<PreviewFontSizeReset {...props} />)
  };
};

it("should render without crashing", () => {
  const { wrapper } = setup();

  expect(wrapper).toMatchSnapshot();
});

it("should receive corresponding props", () => {
  const { resetFontSizeHandler, wrapper } = setup(mount);

  expect(typeof wrapper.prop("resetFontSizeHandler")).toBe("function");
  expect(wrapper.prop("resetFontSizeHandler")).toBe(resetFontSizeHandler);
});

it("should handle button click", () => {
  const { resetFontSizeHandler, wrapper } = setup(mount);

  wrapper.find("button").simulate("click");

  expect(resetFontSizeHandler).toHaveBeenCalledTimes(1);
});

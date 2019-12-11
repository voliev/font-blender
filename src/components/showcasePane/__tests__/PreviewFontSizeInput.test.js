import React from "react";
import { mount, shallow } from "enzyme";
import PreviewFontSizeInput from "../PreviewFontSizeInput";
import { DEFAULT_FONT_SIZE } from "../../../constants";

const setup = (renderFn = shallow, propsOverrides = {}) => {
  const props = {
    fontSizeChangeHandler: jest.fn(),
    value: DEFAULT_FONT_SIZE,
    ...propsOverrides
  };

  return {
    ...props,
    wrapper: renderFn(<PreviewFontSizeInput {...props} />)
  };
};

it("should render without crashing", () => {
  const { wrapper } = setup();

  expect(wrapper).toMatchSnapshot();
});

it("should receive corresponding props", () => {
  const { fontSizeChangeHandler, value, wrapper } = setup(mount);

  expect(typeof wrapper.prop("fontSizeChangeHandler")).toBe("function");
  expect(wrapper.prop("fontSizeChangeHandler")).toBe(fontSizeChangeHandler);

  expect(typeof wrapper.prop("value")).toBe("number");
  expect(wrapper.prop("value")).toBe(value);
});

it("should handle input change", () => {
  const { fontSizeChangeHandler, wrapper } = setup();

  const event = {
    target: {
      value: "Roboto"
    }
  };

  wrapper.find("input").simulate("change", event);

  expect(fontSizeChangeHandler).toHaveBeenCalledTimes(1);
  expect(fontSizeChangeHandler).toHaveBeenCalledWith(event);
});

it("should debounce handler on input change", () => {
  const { fontSizeChangeHandler, wrapper } = setup();
  const input = wrapper.find("input");

  for (let i = 0; i < 100; i++) {
    input.simulate("change");
  }

  expect(fontSizeChangeHandler).toHaveBeenCalledTimes(1);
});

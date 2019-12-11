import React from "react";
import { mount, shallow } from "enzyme";
import BaseFontSizeInput from "../BaseFontSizeInput";

const setup = (renderFn = shallow, propsOverrides = {}) => {
  const props = {
    disabled: false,
    fontSizeChangeHandler: jest.fn(),
    value: 16,
    ...propsOverrides
  };

  return {
    ...props,
    wrapper: renderFn(<BaseFontSizeInput {...props} />)
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
  const { disabled, fontSizeChangeHandler, value, wrapper } = setup(mount);

  expect(typeof wrapper.prop("value")).toBe("number");
  expect(wrapper.prop("value")).toBe(value);

  expect(typeof wrapper.prop("disabled")).toBe("boolean");
  expect(wrapper.prop("disabled")).toBe(disabled);

  expect(typeof wrapper.prop("fontSizeChangeHandler")).toBe("function");
  expect(wrapper.prop("fontSizeChangeHandler")).toBe(fontSizeChangeHandler);
});

it("should handle input change", () => {
  const { fontSizeChangeHandler, wrapper } = setup();

  const event = {
    target: {
      value: 18
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

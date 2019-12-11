import React from "react";
import { mount, shallow } from "enzyme";
import ScaleValueSelectList from "../ScaleValueSelectList";

const setup = (renderFn = shallow, propsOverrides = {}) => {
  const props = {
    value: 1.414,
    disabled: false,
    scaleChangeHandler: jest.fn(),
    ...propsOverrides
  };

  return {
    ...props,
    wrapper: renderFn(<ScaleValueSelectList {...props} />)
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
  const { disabled, scaleChangeHandler, value, wrapper } = setup(mount);

  expect(typeof wrapper.prop("value")).toBe("number");
  expect(wrapper.prop("value")).toBe(value);

  expect(typeof wrapper.prop("disabled")).toBe("boolean");
  expect(wrapper.prop("disabled")).toBe(disabled);

  expect(typeof wrapper.prop("scaleChangeHandler")).toBe("function");
  expect(wrapper.prop("scaleChangeHandler")).toBe(scaleChangeHandler);
});

it("should handle select change", () => {
  const { scaleChangeHandler, wrapper } = setup();

  const event = {
    target: {
      value: 1.2
    }
  };

  wrapper.find("select").simulate("change", event);

  expect(scaleChangeHandler).toHaveBeenCalledTimes(1);
  expect(scaleChangeHandler).toHaveBeenCalledWith(event);
});

import React from "react";
import { mount, shallow } from "enzyme";
import TypeScale from "../TypeScale";
import typeScale from "../../../fixtures/typeScale";

const setup = (renderFn = shallow, propsOverrides = {}) => {
  const props = {
    typeScale,
    disabled: false,
    setFontSize: jest.fn(),
    setTypeScale: jest.fn(),
    ...propsOverrides
  };

  return {
    ...props,
    wrapper: renderFn(<TypeScale {...props} />)
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
  const { disabled, setFontSize, setTypeScale, typeScale, wrapper } = setup(
    mount
  );

  expect(typeof wrapper.prop("typeScale")).toBe("object");
  expect(wrapper.prop("typeScale")).toEqual(typeScale);

  expect(typeof wrapper.prop("disabled")).toBe("boolean");
  expect(wrapper.prop("disabled")).toBe(disabled);

  expect(typeof wrapper.prop("setFontSize")).toBe("function");
  expect(wrapper.prop("setFontSize")).toBe(setFontSize);

  expect(typeof wrapper.prop("setTypeScale")).toBe("function");
  expect(wrapper.prop("setTypeScale")).toBe(setTypeScale);
});

it("should handle base font size change", () => {
  const { wrapper, setFontSize } = setup(mount);
  const fontSize = "18";
  const event = {
    target: {
      value: fontSize
    }
  };

  wrapper.find("input").prop("onChange")(event);

  expect(setFontSize).toHaveBeenCalledTimes(1);
  expect(setFontSize).toHaveBeenCalledWith(18);
});

it("should handle scale value change", () => {
  const { wrapper, setTypeScale } = setup(mount);
  const scale = 1.2;
  const event = {
    target: {
      value: scale
    }
  };

  wrapper.find("select").prop("onChange")(event);

  expect(setTypeScale).toHaveBeenCalledTimes(1);
  expect(setTypeScale).toHaveBeenCalledWith(scale);
});

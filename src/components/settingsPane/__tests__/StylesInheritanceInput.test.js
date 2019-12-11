import React from "react";
import { mount, shallow } from "enzyme";
import CheckBoxOutlineBlank from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxOutlined from "@material-ui/icons/CheckBoxOutlined";
import StylesInheritanceInput from "../StylesInheritanceInput";

const setup = (renderFn = shallow, propsOverrides = {}) => {
  const props = {
    disabled: false,
    element: "h1",
    inheritStyles: true,
    stylesInheritanceChangeHandler: jest.fn(),
    ...propsOverrides
  };

  return {
    ...props,
    wrapper: renderFn(<StylesInheritanceInput {...props} />)
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
  const {
    disabled,
    element,
    inheritStyles,
    stylesInheritanceChangeHandler,
    wrapper
  } = setup(mount);

  expect(typeof wrapper.prop("disabled")).toBe("boolean");
  expect(wrapper.prop("disabled")).toBe(disabled);

  expect(typeof wrapper.prop("element")).toBe("string");
  expect(wrapper.prop("element")).toBe(element);

  expect(typeof wrapper.prop("inheritStyles")).toBe("boolean");
  expect(wrapper.prop("inheritStyles")).toBe(inheritStyles);

  expect(typeof wrapper.prop("stylesInheritanceChangeHandler")).toBe(
    "function"
  );
  expect(wrapper.prop("stylesInheritanceChangeHandler")).toBe(
    stylesInheritanceChangeHandler
  );
});

it("should set corresponding icon", () => {
  const { wrapper } = setup();

  expect(wrapper.find(CheckBoxOutlined).length).toBe(1);
  expect(wrapper.find(CheckBoxOutlineBlank).length).toBe(0);

  wrapper.setProps({ inheritStyles: false });

  expect(wrapper.find(CheckBoxOutlined).length).toBe(0);
  expect(wrapper.find(CheckBoxOutlineBlank).length).toBe(1);
});

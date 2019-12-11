import React from "react";
import { mount, shallow } from "enzyme";
import UndoButton from "../UndoButton";

const setup = (renderFn = shallow, propsOverrides = {}) => {
  const props = {
    onClickHandler: jest.fn(),
    ...propsOverrides
  };

  return {
    ...props,
    wrapper: renderFn(<UndoButton {...props} />)
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
  const { wrapper, onClickHandler } = setup(mount);

  expect(typeof wrapper.prop("onClickHandler")).toBe("function");
  expect(wrapper.prop("onClickHandler")).toBe(onClickHandler);
});

it("should handle button click", () => {
  const { wrapper, onClickHandler } = setup();

  wrapper.find("button").simulate("click");

  expect(onClickHandler).toHaveBeenCalledTimes(1);
});

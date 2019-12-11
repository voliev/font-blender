import React from "react";
import { mount, shallow } from "enzyme";
import SelectedFontsFooter from "../SelectedFontsFooter";

const setup = (renderFn = shallow) => {
  const clearSelectedFontsButtonClickHandler = jest.fn();
  const wrapper = renderFn(
    <SelectedFontsFooter
      clearSelectedFontsButtonClickHandler={
        clearSelectedFontsButtonClickHandler
      }
    />
  );

  return { wrapper, clearSelectedFontsButtonClickHandler };
};

afterEach(() => {
  jest.clearAllMocks();
});

it("should render without crashing", () => {
  const { wrapper } = setup();

  expect(wrapper).toMatchSnapshot();
});

it("should receive corresponding props", () => {
  const { wrapper, clearSelectedFontsButtonClickHandler } = setup(mount);

  expect(typeof wrapper.prop("clearSelectedFontsButtonClickHandler")).toBe(
    "function"
  );
  expect(wrapper.prop("clearSelectedFontsButtonClickHandler")).toBe(
    clearSelectedFontsButtonClickHandler
  );
});

it("should call handler on button click", () => {
  const { wrapper, clearSelectedFontsButtonClickHandler } = setup(mount);

  wrapper.find("button").simulate("click");

  expect(clearSelectedFontsButtonClickHandler).toHaveBeenCalledTimes(1);
});

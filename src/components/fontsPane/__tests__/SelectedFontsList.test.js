import React from "react";
import { mount, shallow } from "enzyme";
import SelectedFontsList from "../SelectedFontsList";
import SelectedFontItem from "../SelectedFontItem";
import selectedFonts from "../../../fixtures/selectedFonts";

const setup = (renderFn = shallow, propsOverrides = {}) => {
  const props = {
    fontDeselectionHandler: jest.fn(),
    selectedFonts,
    ...propsOverrides
  };

  return {
    ...props,
    wrapper: renderFn(<SelectedFontsList {...props} />)
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
  const { wrapper, selectedFonts, fontDeselectionHandler } = setup(mount);

  expect(typeof wrapper.prop("selectedFonts")).toBe("object");
  expect(wrapper.prop("selectedFonts").hasOwnProperty("length")).toBeTruthy();
  expect(wrapper.prop("selectedFonts")).toEqual(selectedFonts);

  expect(typeof wrapper.prop("fontDeselectionHandler")).toBe("function");
  expect(wrapper.prop("fontDeselectionHandler")).toEqual(
    fontDeselectionHandler
  );
});

it("should render list items", () => {
  const { selectedFonts, wrapper } = setup();

  expect(wrapper.find(SelectedFontItem)).toHaveLength(selectedFonts.length);
});

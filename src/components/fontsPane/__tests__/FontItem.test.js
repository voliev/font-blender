import React from "react";
import { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";
import FontItem from "../FontItem";
import FontInfo from "../FontInfo";
import FontItemControl from "../FontItemControl";
import { CHAR_RANGE } from "../../../constants";
import fonts from "../../../fixtures/fonts";

const setup = (renderFn = shallow, propsOverrides = {}) => {
  const props = {
    font: fonts["Roboto"],
    isVisible: false,
    selected: false,
    previewFontFamily: undefined,
    fetchFont: jest.fn(),
    addFontToSelected: jest.fn(),
    removeFontFromSelected: jest.fn(),
    startDisplayShowcaseFontPreview: jest.fn(),
    ...propsOverrides
  };

  const mockStore = configureStore();
  const store = mockStore();

  return {
    ...props,
    wrapper: renderFn(<FontItem {...props} store={store} />)
  };
};

afterEach(() => {
  jest.clearAllMocks();
});

it("should render without crashing", () => {
  const family = "Open Sans";
  const font = fonts[family];
  const { wrapper } = setup(shallow, { font });

  expect(wrapper).toMatchSnapshot();
});

it("should receive corresponding props", () => {
  const family = "Open Sans";
  const font = fonts[family];
  const {
    wrapper,
    fetchFont,
    addFontToSelected,
    removeFontFromSelected,
    startDisplayShowcaseFontPreview
  } = setup(mount, { font });

  expect(typeof wrapper.prop("font")).toBe("object");
  expect(wrapper.prop("font")).toEqual(font);

  expect(typeof wrapper.prop("isVisible")).toBe("boolean");
  expect(wrapper.prop("isVisible")).toBeFalsy();

  expect(typeof wrapper.prop("selected")).toBe("boolean");
  expect(wrapper.prop("selected")).toBeFalsy();

  expect(wrapper.prop("previewFontFamily")).toBeUndefined();

  expect(typeof wrapper.prop("fetchFont")).toBe("function");
  expect(wrapper.prop("fetchFont")).toBe(fetchFont);

  expect(typeof wrapper.prop("addFontToSelected")).toBe("function");
  expect(wrapper.prop("addFontToSelected")).toBe(addFontToSelected);

  expect(typeof wrapper.prop("removeFontFromSelected")).toBe("function");
  expect(wrapper.prop("removeFontFromSelected")).toBe(removeFontFromSelected);

  expect(typeof wrapper.prop("startDisplayShowcaseFontPreview")).toBe(
    "function"
  );
  expect(wrapper.prop("startDisplayShowcaseFontPreview")).toBe(
    startDisplayShowcaseFontPreview
  );
});

it("should request font when list item becomes visible", () => {
  const family = "Roboto";
  const font = fonts[family];
  const { wrapper, fetchFont } = setup(mount, { font });

  expect(fetchFont).not.toHaveBeenCalled();

  wrapper.setProps({ isVisible: true });

  expect(fetchFont).toHaveBeenCalledTimes(1);
  expect(fetchFont).toHaveBeenCalledWith(family, CHAR_RANGE);
});

it("should set corresponding component classes", () => {
  const family = "Roboto";
  const font = fonts[family];
  const { wrapper } = setup(shallow, { font });

  expect(wrapper.hasClass("FontItem")).toBeTruthy();
  expect(wrapper.hasClass("selected")).toBeFalsy();
  expect(wrapper.hasClass("fetching")).toBeFalsy();
  expect(wrapper.hasClass("blank")).toBeTruthy();
  expect(wrapper.hasClass("preview")).toBeFalsy();

  wrapper.setProps({
    font: {
      ...font,
      fetching: true
    }
  });
  expect(wrapper.hasClass("fetching")).toBeTruthy();

  wrapper.setProps({
    font: {
      ...font,
      requested: true
    }
  });
  expect(wrapper.hasClass("blank")).toBeFalsy();

  wrapper.setProps({ selected: true });

  expect(wrapper.hasClass("selected")).toBeTruthy();

  wrapper.setProps({ previewFontFamily: family });

  expect(wrapper.hasClass("preview")).toBeTruthy();
});

it("should handle font preview click", () => {
  const family = "Open Sans";
  const font = fonts[family];
  const { wrapper, startDisplayShowcaseFontPreview } = setup(mount, { font });

  const event = { currentTarget: { dataset: { family } } };
  wrapper.find(FontInfo).prop("fontPreviewClickHandler")(event);

  expect(startDisplayShowcaseFontPreview).toHaveBeenCalledTimes(1);
  expect(startDisplayShowcaseFontPreview).toHaveBeenCalledWith(family);
});

it("should handle font selection/deselection", () => {
  const family = "Open Sans";
  const font = fonts[family];
  const { addFontToSelected, removeFontFromSelected, wrapper } = setup(
    shallow,
    { font }
  );

  const event = { currentTarget: { value: family } };
  wrapper.find(FontItemControl).prop("fontSelectionDeselectionHandler")(event);

  expect(addFontToSelected).toHaveBeenCalledTimes(1);
  expect(addFontToSelected).toHaveBeenCalledWith(family);
  expect(removeFontFromSelected).toHaveBeenCalledTimes(0);

  wrapper.setProps({ selected: true });
  wrapper.find(FontItemControl).prop("fontSelectionDeselectionHandler")(event);

  expect(removeFontFromSelected).toHaveBeenCalledTimes(1);
  expect(removeFontFromSelected).toHaveBeenCalledWith(family);
  expect(addFontToSelected).toHaveBeenCalledTimes(1);
});

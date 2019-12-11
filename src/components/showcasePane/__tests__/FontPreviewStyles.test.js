import React from "react";
import { mount, shallow } from "enzyme";
import FontPreviewStyles from "../FontPreviewStyles";
import PreviewFontSizeInput from "../PreviewFontSizeInput";
import PreviewFontSizeReset from "../PreviewFontSizeReset";
import { DEFAULT_FONT_SIZE } from "../../../constants";
import fonts from "../../../fixtures/fonts";

const setup = (renderFn = shallow, propsOverrides = {}) => {
  const font = fonts["Roboto"];
  const props = {
    family: font.family,
    category: font.category,
    variants: font.variants,
    ...propsOverrides
  };

  return {
    ...props,
    wrapper: renderFn(<FontPreviewStyles {...props} />)
  };
};

it("should render without crashing", () => {
  const { wrapper } = setup();

  expect(wrapper).toMatchSnapshot();
});

it("should set default font size on initial render", () => {
  const { wrapper } = setup();

  expect(wrapper.state("fontSize")).toBe(DEFAULT_FONT_SIZE);
});

it("should receive corresponding props", () => {
  const { wrapper, category, family, variants } = setup(mount);

  expect(typeof wrapper.prop("category")).toBe("string");
  expect(wrapper.prop("category")).toBe(category);

  expect(typeof wrapper.prop("family")).toBe("string");
  expect(wrapper.prop("family")).toBe(family);

  expect(typeof wrapper.prop("variants")).toBe("object");
  expect(wrapper.prop("variants").hasOwnProperty("length")).toBeTruthy();
  expect(wrapper.prop("variants")).toBe(variants);
});

it("should handle font size change", () => {
  const { wrapper } = setup();
  const event = {
    target: {
      value: "18"
    }
  };

  wrapper.find(PreviewFontSizeInput).prop("fontSizeChangeHandler")(event);

  expect(wrapper.state("fontSize")).toBe(18);
});

it("should handle font size reset", () => {
  const { wrapper } = setup();
  const event = {
    target: {
      value: "18"
    }
  };

  wrapper.find(PreviewFontSizeInput).prop("fontSizeChangeHandler")(event);

  expect(wrapper.state("fontSize")).toBe(18);

  wrapper.find(PreviewFontSizeReset).prop("resetFontSizeHandler")();

  expect(wrapper.state("fontSize")).toBe(DEFAULT_FONT_SIZE);
});

it("should reset font size on font family change", () => {
  const { wrapper } = setup();
  const event = {
    target: {
      value: "18"
    }
  };

  wrapper.find(PreviewFontSizeInput).prop("fontSizeChangeHandler")(event);

  expect(wrapper.state("fontSize")).toBe(18);

  const newFont = fonts["Open Sans"];

  wrapper.setProps({
    category: newFont.category,
    family: newFont.family,
    variants: newFont.variants
  });

  expect(wrapper.state("fontSize")).toBe(DEFAULT_FONT_SIZE);
});

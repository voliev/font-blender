import React from "react";
import { mount, shallow } from "enzyme";
import FontPreviewVariants from "../FontPreviewVariants";
import { DEFAULT_FONT_SIZE } from "../../../constants";
import { SHOWCASE_STRING } from "../../../constants";
import { variantToStyle } from "../../../utils";
import fonts from "../../../fixtures/fonts";

const setup = (renderFn = shallow, propsOverrides = {}) => {
  const font = fonts["Roboto"];
  const props = {
    category: font.category,
    family: font.family,
    fontSize: DEFAULT_FONT_SIZE,
    variants: font.variants,
    ...propsOverrides
  };

  return {
    ...props,
    wrapper: renderFn(<FontPreviewVariants {...props} />)
  };
};

it("should render without crashing", () => {
  const { wrapper } = setup();

  expect(wrapper).toMatchSnapshot();
});

it("should receive corresponding props", () => {
  const { category, family, fontSize, variants, wrapper } = setup(mount);

  expect(typeof wrapper.find(FontPreviewVariants).prop("category")).toBe(
    "string"
  );
  expect(wrapper.find(FontPreviewVariants).prop("category")).toBe(category);

  expect(typeof wrapper.find(FontPreviewVariants).prop("family")).toBe(
    "string"
  );
  expect(wrapper.find(FontPreviewVariants).prop("family")).toBe(family);

  expect(typeof wrapper.find(FontPreviewVariants).prop("fontSize")).toBe(
    "number"
  );
  expect(wrapper.find(FontPreviewVariants).prop("fontSize")).toBe(fontSize);

  expect(typeof wrapper.find(FontPreviewVariants).prop("variants")).toBe(
    "object"
  );
  expect(
    wrapper
      .find(FontPreviewVariants)
      .prop("variants")
      .hasOwnProperty("length")
  ).toBeTruthy();
  expect(wrapper.find(FontPreviewVariants).prop("variants")).toEqual(variants);
});

it("should set corresponding styles on font variants", () => {
  const { category, family, fontSize, variants, wrapper } = setup();

  wrapper.find(".variant-value").forEach((node, idx) => {
    expect(node.prop("style")).toEqual({
      font: `${variantToStyle(
        variants[idx]
      )} ${fontSize}px ${family}, ${category}`
    });
  });

  wrapper.find(".variant-example").forEach((node, idx) => {
    expect(node.prop("style")).toEqual({
      font: `${variantToStyle(variants[idx])} 16px ${family}, ${category}`
    });
  });
});

it("should render corresponding variant values", () => {
  const { variants, wrapper } = setup();

  wrapper.find(".variant-value").forEach((node, idx) => {
    expect(node.text()).toBe(variants[idx]);
  });
});

it("should render showcase string", () => {
  const { wrapper } = setup();

  wrapper.find(".variant-example").forEach((node, idx) => {
    expect(node.text()).toBe(SHOWCASE_STRING);
  });
});

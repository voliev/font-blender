import React from "react";
import { mount, shallow } from "enzyme";
import FontInfo from "../FontInfo";
import visibleFonts from "../../../fixtures/visibleFonts";

const setup = (renderFn = shallow, propsOverrides = {}) => {
  const props = {
    ...visibleFonts[0],
    fontPreviewClickHandler: jest.fn(),
    ...propsOverrides
  };

  return {
    ...props,
    wrapper: renderFn(<FontInfo {...props} />)
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
    family,
    category,
    variants,
    subsets,
    fontPreviewClickHandler,
    wrapper
  } = setup(mount);

  expect(typeof wrapper.prop("family")).toBe("string");
  expect(wrapper.prop("family")).toBe(family);

  expect(typeof wrapper.prop("category")).toBe("string");
  expect(wrapper.prop("category")).toBe(category);

  expect(typeof wrapper.prop("variants")).toBe("object");
  expect(wrapper.prop("variants").hasOwnProperty("length")).toBeTruthy();
  expect(wrapper.prop("variants")).toEqual(variants);

  expect(typeof wrapper.prop("subsets")).toBe("object");
  expect(wrapper.prop("subsets").hasOwnProperty("length")).toBeTruthy();
  expect(wrapper.prop("subsets")).toBe(subsets);

  expect(typeof wrapper.prop("fetching")).toBe("boolean");
  expect(wrapper.prop("fetching")).toBe(false);

  expect(typeof wrapper.prop("fontPreviewClickHandler")).toBe("function");
  expect(wrapper.prop("fontPreviewClickHandler")).toBe(fontPreviewClickHandler);
});

it("should call handler on font family click", () => {
  const { fontPreviewClickHandler, wrapper } = setup(mount);

  wrapper.find(".family-name").simulate("click");

  expect(fontPreviewClickHandler).toHaveBeenCalled();
  expect(fontPreviewClickHandler).toHaveBeenCalledTimes(1);
});

it("should set corresponding class on font fetching", () => {
  const { wrapper } = setup(mount);

  expect(wrapper.find(".family-name").hasClass("fetching")).toBeFalsy();

  wrapper.setProps({ fetching: true });

  expect(wrapper.find(".family-name").hasClass("fetching")).toBeTruthy();
});

it("should set inline style depending on the current fetching value", () => {
  const { family, category, wrapper } = setup(mount);

  expect(wrapper.find(".family-name").prop("style")).toEqual({
    fontFamily: `'${family}', '${category}'`
  });

  wrapper.setProps({ fetching: true });

  expect(wrapper.find(".family-name").prop("style")).toEqual({
    fontFamily: `${category}`
  });
});

it("should set corresponding text depending on property array length", () => {
  const { subsets, variants, wrapper } = setup();

  expect(wrapper.find(".charsets").text()).toBe(
    `${subsets.length} character sets`
  );

  wrapper.setProps({ subsets: subsets.slice(0, 1) });

  expect(wrapper.find(".charsets").text()).toBe("1 character set");

  expect(wrapper.find(".styles").text()).toBe(`${variants.length} styles`);

  wrapper.setProps({ variants: variants.slice(0, 1) });

  expect(wrapper.find(".styles").text()).toBe("1 style");
});

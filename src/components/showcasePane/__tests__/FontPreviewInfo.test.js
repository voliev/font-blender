import React from "react";
import { shallow } from "enzyme";
import FontPreviewInfo from "../FontPreviewInfo";
import fonts from "../../../fixtures/fonts";

const setup = (renderFn = shallow, propsOverrides = {}) => {
  const font = fonts["Roboto"];
  const props = {
    family: font.family,
    category: font.category,
    subsets: font.subsets,
    ...propsOverrides
  };

  return {
    ...props,
    wrapper: renderFn(<FontPreviewInfo {...props} />)
  };
};

it("should render without crashing", () => {
  const { wrapper } = setup();

  expect(wrapper).toMatchSnapshot();
});

it("should pass corresponding style", () => {
  const { family, category, wrapper } = setup();

  expect(wrapper.find("h2").prop("style")).toEqual({
    fontFamily: `'${family}', ${category}`
  });
});

it("should render charsets list", () => {
  const { subsets, wrapper } = setup();

  wrapper
    .find("li")
    .forEach((node, idx) => expect(node.text()).toBe(subsets[idx]));
});

it("should render category name", () => {
  const { category, wrapper } = setup();

  expect(wrapper.find(".category-name").text()).toBe(category);
});

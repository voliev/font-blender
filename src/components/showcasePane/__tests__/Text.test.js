import React from "react";
import { mount, shallow } from "enzyme";
import Text from "../Text";
import { generateElementsStyles } from "../../../utils";
import fonts from "../../../fixtures/fonts";
import background from "../../../fixtures/background";
import typeScale from "../../../fixtures/typeScale";
import textStyles from "../../../fixtures/textStyles";

const setup = (renderFn = shallow, propsOverrides = {}) => {
  const props = {
    background,
    elementsStyles: generateElementsStyles(typeScale, textStyles, fonts),
    ...propsOverrides
  };

  return {
    ...props,
    wrapper: renderFn(<Text {...props} />)
  };
};

it("should render without crashing", () => {
  const { wrapper } = setup();

  expect(wrapper).toMatchSnapshot();
});

it("should set corresponding styles", () => {
  const { elementsStyles, wrapper } = setup(mount);

  expect(wrapper.find(".Text").prop("style")).toEqual({
    backgroundColor: `${background.color}`,
    ...elementsStyles.body
  });

  expect(wrapper.find("h1").prop("style")).toEqual(elementsStyles.h1);
  expect(wrapper.find("h2").prop("style")).toEqual(elementsStyles.h2);
  expect(wrapper.find("h3").prop("style")).toEqual(elementsStyles.h3);
  wrapper.find("h4").forEach(node => {
    expect(node.prop("style")).toEqual(elementsStyles.h4);
  });
  expect(wrapper.find("ul").prop("style")).toEqual(elementsStyles.li);
  expect(wrapper.find("small").prop("style")).toEqual(elementsStyles.small);
});

import React from "react";
import { mount, shallow } from "enzyme";
import SelectedFontItem from "../SelectedFontItem";

const setup = (renderFn = shallow, propsOverrides = {}) => {
  const props = {
    family: "Roboto",
    fontDeselectionHandler: jest.fn(),
    ...propsOverrides
  };

  return {
    ...props,
    wrapper: renderFn(<SelectedFontItem {...props} />)
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
  const { family, fontDeselectionHandler, wrapper } = setup(mount);

  expect(typeof wrapper.prop("family")).toBe("string");
  expect(wrapper.prop("family")).toBe(family);

  expect(typeof wrapper.prop("fontDeselectionHandler")).toBe("function");
  expect(wrapper.prop("fontDeselectionHandler")).toBe(fontDeselectionHandler);
});

it("should add class 'active'", () => {
  const componentDidMount = jest.spyOn(
    SelectedFontItem.prototype,
    "componentDidMount"
  );
  const { wrapper } = setup(mount);
  const instance = wrapper.instance();

  expect(componentDidMount).toHaveBeenCalledTimes(1);
  expect(instance.item.current.classList.contains("active")).toBeTruthy();
});

it("should handle button click", () => {
  const handleButtonClick = jest.spyOn(
    SelectedFontItem.prototype,
    "handleButtonClick"
  );
  const { wrapper } = setup(mount);
  const instance = wrapper.instance();

  expect(instance.item.current.classList.contains("active")).toBeTruthy();
  wrapper.find("button").simulate("click", {
    target: {
      closest: () => false
    }
  });

  expect(handleButtonClick).toHaveBeenCalledTimes(1);
  expect(instance.item.current.classList.contains("active")).toBeTruthy();

  wrapper.find("button").simulate("click", {
    target: {
      closest: () => true
    }
  });

  expect(handleButtonClick).toHaveBeenCalledTimes(2);
  expect(instance.item.current.classList.contains("active")).toBeFalsy();
});

it("should properly handle transition end", () => {
  const handleTransitionEnd = jest.spyOn(
    SelectedFontItem.prototype,
    "handleTransitionEnd"
  );
  const { family, fontDeselectionHandler, wrapper } = setup(mount);

  wrapper.find("li").simulate("transitionend", {
    target: {
      classList: {
        contains: () => false
      }
    }
  });

  expect(handleTransitionEnd).toHaveBeenCalledTimes(1);
  expect(fontDeselectionHandler).toHaveBeenCalledTimes(1);
  expect(fontDeselectionHandler).toHaveBeenLastCalledWith(family);

  wrapper.find("li").simulate("transitionend", {
    target: {
      classList: {
        contains: () => true
      }
    }
  });

  expect(handleTransitionEnd).toHaveBeenCalledTimes(2);
  expect(fontDeselectionHandler).toHaveBeenCalledTimes(1);
});

it("should ignore transform transition end", () => {
  const { wrapper, fontDeselectionHandler } = setup(mount);

  wrapper.instance().handleTransitionEnd({
    persist: () => {},
    propertyName: "transform"
  });

  expect(fontDeselectionHandler).toHaveBeenCalledTimes(0);
});

import React from "react";
import { mount, shallow } from "enzyme";
import OutsideClickHandler from "react-outside-click-handler";
import ColorPicker from "../ColorPicker";
import { SketchPicker } from "react-color";

const setup = (
  renderFn = shallow,
  propsOverrides = {},
  container = undefined
) => {
  const props = {
    disabled: false,
    colorChangeHandler: jest.fn(),
    color: "#333",
    ...propsOverrides
  };

  return {
    ...props,
    wrapper: container
      ? renderFn(<ColorPicker {...props} />, { attachTo: container })
      : renderFn(<ColorPicker {...props} />)
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
  const { color, disabled, colorChangeHandler, wrapper } = setup(mount);

  expect(typeof wrapper.prop("disabled")).toBe("boolean");
  expect(wrapper.prop("disabled")).toBe(disabled);

  expect(typeof wrapper.prop("colorChangeHandler")).toBe("function");
  expect(wrapper.prop("colorChangeHandler")).toBe(colorChangeHandler);

  expect(typeof wrapper.prop("color")).toBe("string");
  expect(wrapper.prop("color")).toBe(color);
});

it("should set corresponding component classes", () => {
  const { wrapper } = setup();

  expect(wrapper.find(".ColorPicker").hasClass("active")).toBeFalsy();
  expect(wrapper.find(".ColorPicker").hasClass("disabled")).toBeFalsy();

  wrapper.setState({ displayColorPicker: true });

  expect(wrapper.find(".ColorPicker").hasClass("active")).toBeTruthy();

  wrapper.setState({ displayColorPicker: false });

  expect(wrapper.find(".ColorPicker").hasClass("active")).toBeFalsy();

  wrapper.setProps({ disabled: true });

  expect(wrapper.find(".ColorPicker").hasClass("disabled")).toBeTruthy();
});

it("should set corresponding state on initial render", () => {
  const { wrapper } = setup();

  expect(wrapper.state("displayColorPicker")).toBeFalsy();
});

it("should handle color change", () => {
  const { colorChangeHandler, wrapper } = setup();

  wrapper.setState({ displayColorPicker: true });
  wrapper.find(SketchPicker).prop("onChangeComplete")();

  expect(colorChangeHandler).toHaveBeenCalled();
  // Note: No need to check handler arguments because they are
  //       controlled by `react-color` npm module
});

it("should set ref", () => {
  const { wrapper } = setup(mount);

  const ref = wrapper.instance().containerRef.current;

  const container = wrapper.find(".active-container").instance();

  expect(ref).not.toBeNull();
  expect(ref).toEqual(container);
});

it("should handle click outside of the color picker", () => {
  const handleOutsideClick = jest.spyOn(
    ColorPicker.prototype,
    "handleOutsideClick"
  );
  const { wrapper } = setup();

  wrapper.setState({ displayColorPicker: true });

  wrapper.find(OutsideClickHandler).prop("onOutsideClick")();

  expect(handleOutsideClick).toHaveBeenCalledTimes(1);
  expect(wrapper.state("displayColorPicker")).toBeFalsy();
});

it("should disable OutsideClickHandler if color picker is inactive", () => {
  const { wrapper } = setup();

  expect(wrapper.state("displayColorPicker")).toBeFalsy();
  expect(wrapper.find(OutsideClickHandler).prop("disabled")).toBeTruthy();
});

it("should render picker depending on the components` state value", () => {
  const { wrapper } = setup();

  expect(wrapper.find(SketchPicker).length).toBe(0);

  wrapper.setState({ displayColorPicker: true });

  expect(wrapper.find(SketchPicker).length).toBe(1);
});

it("should set picker visibility handler depending on `disabled` prop value", () => {
  const { wrapper } = setup();

  expect(typeof wrapper.find(".active-container").prop("onClick")).toBe(
    "function"
  );

  wrapper.setProps({ disabled: true });

  expect(wrapper.find(".active-container").prop("onClick")).toBeNull();
});

it("should handle click on icon container", () => {
  const handleClick = jest.spyOn(ColorPicker.prototype, "handleClick");
  const { wrapper } = setup();

  wrapper.find(".active-container").simulate("click");

  expect(handleClick).toHaveBeenCalledTimes(1);
});

it("should return corresponding string depending on the color picker icon positon", () => {
  const getPickerPositionClass = jest.spyOn(
    ColorPicker.prototype,
    "getPickerPositionClass"
  );
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
      <body>
        <div class="target"></div>
      </body>
    </html>
  `);

  Object.defineProperty(document, "documentElement", {
    value: dom.window.document.documentElement
  });

  Object.defineProperty(dom.window.HTMLElement.prototype, "clientHeight", {
    value: 800
  });

  const container = dom.window.document.createElement("div");
  container.setAttribute("class", "container");

  const { wrapper } = setup(mount, undefined, container);

  const target = dom.window.document.querySelector(".target");
  target.appendChild(container);

  let bottom = 250;
  const containerRefContext = {
    containerRef: {
      current: {
        getBoundingClientRect() {
          return { bottom };
        }
      }
    }
  };

  wrapper.instance().getPickerPositionClass.call(containerRefContext);

  expect(getPickerPositionClass).toHaveLastReturnedWith("below");

  bottom = 550;

  wrapper.instance().getPickerPositionClass.call(containerRefContext);

  expect(getPickerPositionClass).toHaveLastReturnedWith("above");
});

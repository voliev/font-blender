import React from "react";
import { mount, shallow } from "enzyme";
import OutsideClickHandler from "react-outside-click-handler";
import SelectedFonts from "../SelectedFonts";
import SelectedFontsHeaderBar from "../SelectedFontsHeaderBar";
import selectedFonts from "../../../fixtures/selectedFonts";

const setup = (
  renderFn = shallow,
  propsOverrides = {},
  container = undefined
) => {
  const props = {
    selectedFonts: [],
    clearSelectedFonts: jest.fn(),
    removeFontFromSelected: jest.fn(),
    ...propsOverrides
  };

  return {
    ...props,
    wrapper: container
      ? renderFn(<SelectedFonts {...props} />, { attachTo: container })
      : renderFn(<SelectedFonts {...props} />)
  };
};

afterEach(() => {
  jest.clearAllMocks();
});

it("should render without crashing", () => {
  const { wrapper } = setup();

  expect(wrapper).toMatchSnapshot();
});

it("should not crash if the list is empty", () => {
  const { wrapper } = setup(shallow, { selectedFonts: [] });

  expect(wrapper).toMatchSnapshot();
});

it("should receive corresponding props", () => {
  const { clearSelectedFonts, removeFontFromSelected, wrapper } = setup(mount);

  expect(typeof wrapper.prop("selectedFonts")).toBe("object");
  expect(wrapper.prop("selectedFonts").hasOwnProperty("length")).toBeTruthy();

  expect(typeof wrapper.prop("clearSelectedFonts")).toBe("function");
  expect(wrapper.prop("clearSelectedFonts")).toBe(clearSelectedFonts);

  expect(typeof wrapper.prop("removeFontFromSelected")).toBe("function");
  expect(wrapper.prop("removeFontFromSelected")).toBe(removeFontFromSelected);
});

it("should initially render empty list", () => {
  const { wrapper } = setup();

  expect(wrapper.instance().getLifecycleStage()).toBe("empty");
  expect(wrapper.find("main")).toHaveLength(0);
});

it("should properly set OutsideClickHandler's 'disabled' value", () => {
  const { wrapper } = setup();

  expect(wrapper.find(OutsideClickHandler).prop("disabled")).toBeTruthy();

  wrapper.setProps({ selectedFonts });
  wrapper.setState({ stage: 3 });

  expect(wrapper.find(OutsideClickHandler).prop("disabled")).toBeFalsy();

  wrapper.setState({ stage: 1 });

  expect(wrapper.find(OutsideClickHandler).prop("disabled")).toBeTruthy();
});

it("should change component's lifecycle stage on header bar click", () => {
  const { wrapper } = setup(mount);

  expect(wrapper.state("stage")).toBe(0);

  wrapper.setProps({ selectedFonts });

  expect(wrapper.state("stage")).toBe(1);

  const event = {
    target: {
      closest: () => false
    }
  };

  wrapper.find(SelectedFontsHeaderBar).prop("headerBarClickHandler")(event);

  expect(wrapper.state("stage")).toBe(1);

  event.target.closest = () => true;
  wrapper.find(SelectedFontsHeaderBar).prop("headerBarClickHandler")(event);

  expect(wrapper.state("stage")).toBe(2);

  wrapper.setState({ stage: 3 });
  wrapper.find(SelectedFontsHeaderBar).prop("headerBarClickHandler")(event);

  expect(wrapper.state("stage")).toBe(4);
});

it("should return corresponding stage string value", () => {
  const getLifecycleStage = jest.spyOn(
    SelectedFonts.prototype,
    "getLifecycleStage"
  );
  const { wrapper } = setup(mount);
  const stages = [
    "empty",
    "folded",
    "unfolding",
    "active",
    "folding",
    "folding-to-clear"
  ];

  stages.forEach((stage, idx) => {
    if (wrapper.state("stage") === 1) {
      wrapper.setProps({ selectedFonts });
    }

    if (idx > 0) {
      wrapper.setState({ stage: idx });
    }
    wrapper.instance().getLifecycleStage();

    expect(getLifecycleStage).toHaveLastReturnedWith(stage);
  });
});

it("should handle font deselection", () => {
  const { wrapper, removeFontFromSelected } = setup(mount);
  const family = "Roboto";

  wrapper.setProps({ selectedFonts: [family] });

  expect(wrapper.instance().getLifecycleStage()).toBe("folded");

  wrapper.setState({ stage: 3 });

  wrapper.instance().handleFontDeselection(family);

  expect(wrapper.instance().getLifecycleStage()).toBe("folding-to-clear");

  wrapper.setProps({ selectedFonts });
  wrapper.setState({ stage: 3 });

  wrapper.instance().handleFontDeselection(family);

  expect(removeFontFromSelected).toHaveBeenCalledTimes(1);
  expect(removeFontFromSelected).toHaveBeenCalledWith(family);
});

it("should change state on clearing selected fonts' list", () => {
  const { wrapper } = setup(mount);

  wrapper.setProps({ selectedFonts });

  const event = {
    target: {}
  };

  wrapper.instance().handleClearSelectedFontsButtonClick(event);

  expect(wrapper.state("stage")).toBe(1);

  wrapper.setState({ stage: 3 });

  event.target = { value: "clear" };

  wrapper.instance().handleClearSelectedFontsButtonClick(event);

  expect(wrapper.state("stage")).toBe(5);
});

it("should handle list transition end event", () => {
  const { clearSelectedFonts, removeFontFromSelected, wrapper } = setup(mount);
  const event = {
    propertyName: "height",
    target: {
      className: "SelectedFontsList"
    }
  };

  wrapper.setProps({ selectedFonts });
  wrapper.setState({ stage: 2 });
  wrapper.instance().handleTransitionEnd(event);

  expect(wrapper.state("stage")).toBe(2);

  event.propertyName = "transform";
  event.target = {
    className: "SelectedFonts unfolding"
  };

  wrapper.instance().handleTransitionEnd(event);

  expect(wrapper.state("stage")).toBe(3);

  wrapper.setState({ stage: 4 });
  wrapper.instance().handleTransitionEnd(event);

  expect(wrapper.state("stage")).toBe(1);

  wrapper.setState({ stage: 5 });
  wrapper.instance().handleTransitionEnd(event);

  expect(clearSelectedFonts).toHaveBeenCalledTimes(1);
  expect(wrapper.state("stage")).toBe(0);

  wrapper.setState({ stage: 5 });
  wrapper.setProps({ selectedFonts: ["Roboto"] });
  wrapper.instance().handleTransitionEnd(event);

  expect(removeFontFromSelected).toHaveBeenCalledTimes(1);
  expect(removeFontFromSelected).toHaveBeenLastCalledWith("Roboto");
  expect(wrapper.state("stage")).toBe(0);
});

it("should handle click outside of the list", () => {
  const { wrapper } = setup(mount);
  const event = {
    target: {
      value: "undo"
    }
  };

  wrapper.setProps({ selectedFonts });
  wrapper.setState({ stage: 3 });
  wrapper.instance().handleOutsideClick(event);

  expect(wrapper.state("stage")).toBe(3);

  event.target = {};
  wrapper.instance().handleOutsideClick(event);

  expect(wrapper.state("stage")).toBe(4);
});

it("should set corresponding style for list animating", () => {
  const setComponentsCSSTransform = jest.spyOn(
    SelectedFonts.prototype,
    "setComponentsCSSTransform"
  );
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  const dom = new JSDOM("<div class='target'></div>");

  Object.defineProperty(dom.window.HTMLElement.prototype, "clientHeight", {
    value: 200
  });

  const target = dom.window.document.querySelector(".target");
  const { wrapper } = setup(mount, undefined, target);

  wrapper.instance().setComponentsCSSTransform();

  expect(setComponentsCSSTransform).toHaveLastReturnedWith({});

  wrapper.setProps({ selectedFonts });
  wrapper.setState({ stage: 4 });
  wrapper.instance().setComponentsCSSTransform();

  expect(setComponentsCSSTransform).toHaveLastReturnedWith({
    transform: "translateY(200px)"
  });

  wrapper.setState({ stage: 2 });
  wrapper.instance().setComponentsCSSTransform();

  expect(setComponentsCSSTransform).toHaveLastReturnedWith({
    transform: "translateY(-200px)"
  });

  wrapper.setState({ stage: 5 });
  wrapper.instance().setComponentsCSSTransform();

  expect(setComponentsCSSTransform).toHaveLastReturnedWith({
    transform: "translateY(200px)"
  });
});

it("should change component's stage when fonts added to the list", () => {
  const { wrapper } = setup();

  expect(wrapper.state("stage")).toBe(0);

  wrapper.setProps({ selectedFonts: ["Roboto"] });

  expect(wrapper.state("stage")).toBe(1);
});

it("should change component's stage when the list becomes empty", () => {
  const { wrapper } = setup();

  expect(wrapper.state("stage")).toBe(0);

  wrapper.setProps({ selectedFonts: ["Roboto"] });

  expect(wrapper.state("stage")).toBe(1);

  wrapper.setProps({ selectedFonts: [] });

  expect(wrapper.state("stage")).toBe(0);
});

it("should set corresponding component classes", () => {
  const { wrapper } = setup(mount);

  expect(wrapper.state("stage")).toBe(0);
  expect(wrapper.find(".SelectedFonts").hasClass("empty")).toBeTruthy();

  wrapper.setProps({ selectedFonts });
  wrapper.update();
  expect(wrapper.find(".SelectedFonts").hasClass("folded")).toBeTruthy();

  wrapper.setState({ stage: 2 });
  expect(wrapper.find(".SelectedFonts").hasClass("unfolding")).toBeTruthy();

  wrapper.setState({ stage: 3 });
  expect(wrapper.find(".SelectedFonts").hasClass("active")).toBeTruthy();

  wrapper.setState({ stage: 4 });
  expect(wrapper.find(".SelectedFonts").hasClass("folding")).toBeTruthy();

  wrapper.setState({ stage: 5 });
  expect(
    wrapper.find(".SelectedFonts").hasClass("folding-to-clear")
  ).toBeTruthy();
});

it("should set corresponding title text", () => {
  const { wrapper } = setup();

  expect(wrapper.find(".SelectedFonts").prop("title")).toBe(
    "Select fonts first"
  );

  wrapper.setProps({ selectedFonts });

  expect(wrapper.find(".SelectedFonts").prop("title")).toBe("Click to Expand");
});

it("should re-render on state update or selected fonts list length change", () => {
  const { wrapper } = setup(mount);
  const shouldComponentUpdate = jest.spyOn(
    SelectedFonts.prototype,
    "shouldComponentUpdate"
  );

  wrapper.setProps({ selectedFonts });

  // First call triggered by props update.
  // Second call triggered by state update (selectedFonts.length
  // change causes "stage" update)
  expect(shouldComponentUpdate).toHaveBeenCalledTimes(2);
  expect(shouldComponentUpdate).toHaveLastReturnedWith(true);

  wrapper.setState({ stage: 2 });

  expect(shouldComponentUpdate).toHaveBeenCalledTimes(3);
  expect(shouldComponentUpdate).toHaveLastReturnedWith(true);

  const updatedSelectedFonts = [...selectedFonts];
  wrapper.setProps({ selectedFonts: updatedSelectedFonts });

  expect(shouldComponentUpdate).toHaveBeenCalledTimes(4);
  expect(shouldComponentUpdate).toHaveLastReturnedWith(false);
});

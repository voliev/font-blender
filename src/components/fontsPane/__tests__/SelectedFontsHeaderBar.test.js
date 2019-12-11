import React from "react";
import { mount, shallow } from "enzyme";
import SelectedFontsHeaderBar from "../SelectedFontsHeaderBar";
import ExpandLessRounded from "@material-ui/icons/ExpandLessRounded";
import ExpandMoreRounded from "@material-ui/icons/ExpandMoreRounded";
import selectedFonts from "../../../fixtures/selectedFonts";

const setup = (renderFn = shallow, propsOverrides = {}) => {
  const props = {
    folded: true,
    selectedFonts,
    headerBarClickHandler: jest.fn(),
    ...propsOverrides
  };

  return {
    ...props,
    wrapper: renderFn(<SelectedFontsHeaderBar {...props} />)
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
  const { wrapper, headerBarClickHandler } = setup(mount);

  expect(typeof wrapper.prop("folded")).toBe("boolean");
  expect(wrapper.prop("folded")).toBeTruthy();

  expect(typeof wrapper.prop("selectedFonts")).toBe("object");
  expect(wrapper.prop("selectedFonts").hasOwnProperty("length")).toBeTruthy();
  expect(wrapper.prop("selectedFonts")).toEqual(selectedFonts);

  expect(typeof wrapper.prop("headerBarClickHandler")).toBe("function");
  expect(wrapper.prop("headerBarClickHandler")).toBe(headerBarClickHandler);
});

it("should set corresponding component classes", () => {
  const { wrapper } = setup(shallow, { selectedFonts: [] });

  expect(wrapper.hasClass("SelectedFontsHeaderBar")).toBeTruthy();
  expect(wrapper.hasClass("empty")).toBeTruthy();

  wrapper.setProps({ selectedFonts });

  expect(wrapper.hasClass("SelectedFontsHeaderBar")).toBeTruthy();
  expect(wrapper.hasClass("empty")).toBeFalsy();
});

it("should set corresponding icon", () => {
  const { wrapper } = setup(mount, { selectedFonts: [] });

  expect(wrapper.find(ExpandLessRounded).length).toBe(1);
  expect(wrapper.find(ExpandMoreRounded).length).toBe(0);

  wrapper.setProps({ selectedFonts });

  expect(wrapper.find(ExpandLessRounded).length).toBe(1);
  expect(wrapper.find(ExpandMoreRounded).length).toBe(0);

  wrapper.setProps({ folded: false });

  expect(wrapper.find(ExpandLessRounded).length).toBe(0);
  expect(wrapper.find(ExpandMoreRounded).length).toBe(1);

  wrapper.setProps({ folded: true });

  expect(wrapper.find(ExpandLessRounded).length).toBe(1);
  expect(wrapper.find(ExpandMoreRounded).length).toBe(0);
});

it("should set corresponding text", () => {
  const { wrapper } = setup(mount, { selectedFonts: [] });

  expect(wrapper.find(".text").text()).toBe("0 families selected");

  wrapper.setProps({ selectedFonts: selectedFonts.slice(0, 1) });

  expect(wrapper.find(".text").text()).toBe("1 family selected");

  wrapper.setProps({ selectedFonts });

  expect(wrapper.find(".text").text()).toBe(
    `${selectedFonts.length} families selected`
  );
});

it("should call handler on header click", () => {
  const { wrapper, headerBarClickHandler } = setup();

  wrapper.simulate("click");

  expect(headerBarClickHandler).toHaveBeenCalledTimes(1);

  wrapper.setProps({ selectedFonts: [] });
  wrapper.simulate("click");

  expect(headerBarClickHandler).toHaveBeenCalledTimes(2);
});

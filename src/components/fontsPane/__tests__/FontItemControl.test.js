import React from "react";
import { mount, shallow } from "enzyme";
import AddCircleRounded from "@material-ui/icons/AddCircleRounded";
import SyncRounded from "@material-ui/icons/SyncRounded";
import CheckCircleRounded from "@material-ui/icons/CheckCircleRounded";
import FontItemControl from "../FontItemControl";
import fonts from "../../../fixtures/fonts";

const setup = (renderFn = shallow, propsOverrides = {}) => {
  const props = {
    ...fonts["Roboto"],
    selected: false,
    fontSelectionDeselectionHandler: jest.fn(),
    requestFont: jest.fn(),
    ...propsOverrides
  };

  return {
    ...props,
    wrapper: renderFn(<FontItemControl {...props} />)
  };
};

afterEach(() => {
  jest.clearAllMocks();
});

it("should render without crashing", () => {
  const { wrapper } = setup(shallow, {
    active: true,
    requested: true,
    prefetched: true
  });

  expect(wrapper).toMatchSnapshot();
});

it("should receive corresponding props", () => {
  const {
    active,
    family,
    fetched,
    fetching,
    prefetched,
    requested,
    fontSelectionDeselectionHandler,
    requestFont,
    wrapper
  } = setup(mount);

  expect(typeof wrapper.prop("family")).toBe("string");
  expect(wrapper.prop("family")).toBe(family);

  expect(typeof wrapper.prop("active")).toBe("boolean");
  expect(wrapper.prop("active")).toBe(active);

  expect(typeof wrapper.prop("requested")).toBe("boolean");
  expect(wrapper.prop("requested")).toBe(requested);

  expect(typeof wrapper.prop("prefetched")).toBe("boolean");
  expect(wrapper.prop("prefetched")).toBe(prefetched);

  expect(typeof wrapper.prop("fetched")).toBe("boolean");
  expect(wrapper.prop("fetched")).toBe(fetched);

  expect(typeof wrapper.prop("fetching")).toBe("boolean");
  expect(wrapper.prop("fetching")).toBe(fetching);

  expect(typeof wrapper.prop("selected")).toBe("boolean");
  expect(wrapper.prop("selected")).toBeFalsy();

  expect(typeof wrapper.prop("fontSelectionDeselectionHandler")).toBe(
    "function"
  );
  expect(wrapper.prop("fontSelectionDeselectionHandler")).toBe(
    fontSelectionDeselectionHandler
  );

  expect(typeof wrapper.prop("requestFont")).toBe("function");
  expect(wrapper.prop("requestFont")).toBe(requestFont);
});

it("should call request handler on button click", () => {
  const { wrapper, requestFont } = setup(shallow, { requested: true });

  wrapper.find("button").simulate("click");

  expect(requestFont).toHaveBeenCalledTimes(1);
});

it("shoul call selection-deselection handler on button click", () => {
  const { wrapper, family, fontSelectionDeselectionHandler } = setup(shallow, {
    active: true,
    prefetched: true,
    selected: false
  });

  const event = {
    currentTarget: {
      value: family
    }
  };

  wrapper.find("button").simulate("click", event);

  expect(fontSelectionDeselectionHandler).toHaveBeenCalledTimes(1);
  expect(fontSelectionDeselectionHandler).toHaveBeenCalledWith(event);

  wrapper.setProps({ selected: true });

  fontSelectionDeselectionHandler.mockClear();

  wrapper.find("button").simulate("click", event);

  expect(fontSelectionDeselectionHandler).toHaveBeenCalledTimes(1);
  expect(fontSelectionDeselectionHandler).toHaveBeenCalledWith(event);
});

it("should set the corresponding icon", () => {
  const { wrapper } = setup(mount);

  expect(wrapper.find(AddCircleRounded).length).toBe(0);
  expect(wrapper.find(SyncRounded).length).toBe(0);
  expect(wrapper.find(CheckCircleRounded).length).toBe(0);

  wrapper.setProps({
    active: false,
    requested: true
  });

  expect(wrapper.find(AddCircleRounded).length).toBe(0);
  expect(wrapper.find(SyncRounded).length).toBe(1);
  expect(wrapper.find(CheckCircleRounded).length).toBe(0);

  wrapper.setProps({
    active: true,
    prefetched: true
  });

  expect(wrapper.find(AddCircleRounded).length).toBe(1);
  expect(wrapper.find(SyncRounded).length).toBe(0);
  expect(wrapper.find(CheckCircleRounded).length).toBe(0);

  wrapper.setProps({ selected: true });

  expect(wrapper.find(AddCircleRounded).length).toBe(0);
  expect(wrapper.find(SyncRounded).length).toBe(0);
  expect(wrapper.find(CheckCircleRounded).length).toBe(1);
});

it("should set the corresponding title attribute", () => {
  const { wrapper } = setup();

  expect(wrapper.find("button").prop("title")).toBe("Fetching...");

  wrapper.setProps({
    active: true,
    prefetched: true
  });

  expect(wrapper.find("button").prop("title")).toBe("Add to Selected");

  wrapper.setProps({ selected: true });

  expect(wrapper.find("button").prop("title")).toBe("Deselect font");

  wrapper.setProps({ selected: false });

  expect(wrapper.find("button").prop("title")).toBe("Add to Selected");
});

it("should set corresponding component classes", () => {
  const { wrapper } = setup();

  expect(wrapper.find(".FontItemControl").hasClass("fetching")).toBeFalsy();

  wrapper.setProps({ fetching: true });

  expect(wrapper.find(".FontItemControl").hasClass("fetching")).toBeTruthy();
});

it("should set corresponding button classes", () => {
  const { wrapper } = setup(shallow, { requested: true });

  expect(wrapper.find(".btn").hasClass("add-circle")).toBeFalsy();
  expect(wrapper.find(".btn").hasClass("checked")).toBeFalsy();
  expect(wrapper.find(".btn").hasClass("sync")).toBeTruthy();

  wrapper.setProps({ prefetched: true });

  expect(wrapper.find(".btn").hasClass("add-circle")).toBeTruthy();
  expect(wrapper.find(".btn").hasClass("checked")).toBeFalsy();
  expect(wrapper.find(".btn").hasClass("sync")).toBeFalsy();

  wrapper.setProps({ selected: true });

  expect(wrapper.find(".btn").hasClass("add-circle")).toBeFalsy();
  expect(wrapper.find(".btn").hasClass("checked")).toBeTruthy();
  expect(wrapper.find(".btn").hasClass("sync")).toBeFalsy();

  wrapper.setProps({ selected: false });

  expect(wrapper.find(".btn").hasClass("add-circle")).toBeTruthy();
  expect(wrapper.find(".btn").hasClass("checked")).toBeFalsy();
  expect(wrapper.find(".btn").hasClass("sync")).toBeFalsy();
});

it("should set corresponding button click handler", () => {
  const { fontSelectionDeselectionHandler, requestFont, wrapper } = setup(
    shallow
  );

  expect(wrapper.find(".btn").prop("onClick")).toBe(requestFont);

  wrapper.setProps({ prefetched: true });

  expect(wrapper.find(".btn").prop("onClick")).toBe(
    fontSelectionDeselectionHandler
  );
});

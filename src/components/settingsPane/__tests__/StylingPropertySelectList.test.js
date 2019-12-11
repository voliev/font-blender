import React from "react";
import { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";
import StylingPropertySelectListConnected, {
  StylingPropertySelectList
} from "../StylingPropertySelectList";
import { getSelectedFonts } from "../../../reducers/selectedFonts";
import { UPDATE_ELEMENT_STYLES } from "../../../constants";
import selectedFonts from "../../../fixtures/selectedFonts";
import fonts from "../../../fixtures/fonts";
import state from "../../../fixtures/state";

const setup = (
  renderFn = shallow,
  property = "font-family",
  propsOverrides = {},
  connected = false
) => {
  const options = {
    "font-family": selectedFonts,
    "font-style": ["normal", "italic"],
    "font-weight": [100, 300, 400, 700, 900]
  };
  const value = {
    "font-family": "Lato",
    "font-style": "italic",
    "font-weight": 300
  };
  const props = {
    disabled: false,
    element: "h1",
    selectedFonts: getSelectedFonts(state),
    options: options[property],
    property,
    value: value[property],
    updateElementStyles: jest.fn(),
    ...propsOverrides
  };

  if (connected) {
    const mockStore = configureStore();
    const store = mockStore(state);

    return {
      ...props,
      store,
      wrapper: renderFn(
        <StylingPropertySelectListConnected store={store} {...props} />
      )
    };
  }

  return {
    ...props,
    wrapper: renderFn(<StylingPropertySelectList {...props} />)
  };
};

afterEach(() => {
  jest.clearAllMocks();
});

it("should render without crashing", () => {
  const { wrapper } = setup(shallow, "font-family");

  expect(wrapper).toMatchSnapshot();
});

it("should receive corresponding props", () => {
  const {
    disabled,
    options,
    property,
    selectedFonts,
    updateElementStyles,
    value,
    wrapper
  } = setup(mount, "font-style");

  expect(typeof wrapper.prop("disabled")).toBe("boolean");
  expect(wrapper.prop("disabled")).toBe(disabled);

  expect(typeof wrapper.prop("selectedFonts")).toBe("object");
  expect(wrapper.prop("selectedFonts")).toEqual(selectedFonts);

  expect(typeof wrapper.prop("options")).toBe("object");
  expect(wrapper.prop("options").hasOwnProperty("length")).toBeTruthy();
  expect(wrapper.prop("options")).toBe(options);

  expect(typeof wrapper.prop("property")).toBe("string");
  expect(wrapper.prop("property")).toEqual(property);

  expect(typeof wrapper.prop("value")).toBe("string");
  expect(wrapper.prop("value")).toEqual(value);

  expect(typeof wrapper.prop("updateElementStyles")).toBe("function");
  expect(wrapper.prop("updateElementStyles")).toEqual(updateElementStyles);
});

it("should set corresponding component classes", () => {
  const { wrapper } = setup(shallow, "font-weight");

  expect(wrapper.hasClass("StylingPropertySelectList")).toBeTruthy();
  expect(wrapper.hasClass("disabled")).toBeFalsy();

  wrapper.setProps({ disabled: true });

  expect(wrapper.hasClass("StylingPropertySelectList")).toBeTruthy();
  expect(wrapper.hasClass("disabled")).toBeTruthy();
});

it("should handle option change", () => {
  const handleStylePropertyChange = jest.spyOn(
    StylingPropertySelectList.prototype,
    "handleStylePropertyChange"
  );
  const { updateElementStyles, wrapper } = setup(shallow, "font-weight");
  const event = {
    target: {
      value: 700
    }
  };

  wrapper.find("select").simulate("change", event);

  expect(handleStylePropertyChange).toHaveBeenCalledTimes(1);
  expect(updateElementStyles).toHaveBeenCalledTimes(1);
  expect(updateElementStyles).toHaveBeenCalledWith("h1", "font-weight", 700);
});

it("should dispatch an action", () => {
  const { store, wrapper } = setup(shallow, "font-family", undefined, true);

  wrapper.prop("updateElementStyles")("h1", "font-style", "italic");

  const actions = store.getActions();

  expect(actions).toContainEqual({
    type: UPDATE_ELEMENT_STYLES,
    element: "h1",
    property: "font-style",
    value: "italic"
  });
});

it("should set corresponding select list options", () => {
  const { wrapper } = setup(shallow, "font-style", {
    options: undefined,
    value: "normal"
  });

  expect(wrapper.find("option").length).toBe(1);
  expect(wrapper.find("option").text()).toBe("normal");

  const options = ["normal", "italic"];

  wrapper.setProps({ options });

  expect(wrapper.find("option").length).toBe(2);
  wrapper.find("option").forEach((node, idx) => node.text() === options[idx]);
});

it("should return correct value for `font-family` property", () => {
  const getStylePropertyValueFromEvent = jest.spyOn(
    StylingPropertySelectList.prototype,
    "getStylePropertyValueFromEvent"
  );
  const { wrapper } = setup(shallow, "font-family");

  wrapper.instance().getStylePropertyValueFromEvent({
    target: { value: "Lato" }
  });

  expect(getStylePropertyValueFromEvent).toHaveLastReturnedWith(fonts["Lato"]);

  wrapper.instance().getStylePropertyValueFromEvent({
    target: { value: "sans-serif" }
  });

  expect(getStylePropertyValueFromEvent).toHaveLastReturnedWith("sans-serif");
});

it("should return correct value for `font-weight` property", () => {
  const getStylePropertyValueFromEvent = jest.spyOn(
    StylingPropertySelectList.prototype,
    "getStylePropertyValueFromEvent"
  );
  const { wrapper } = setup(shallow, "font-weight");

  wrapper.instance().getStylePropertyValueFromEvent({
    target: { value: "500" }
  });

  expect(getStylePropertyValueFromEvent).toHaveReturnedWith(500);
});

it("should return correct value for `font-style` property", () => {
  const getStylePropertyValueFromEvent = jest.spyOn(
    StylingPropertySelectList.prototype,
    "getStylePropertyValueFromEvent"
  );
  const { wrapper } = setup(shallow, "font-style");

  wrapper.instance().getStylePropertyValueFromEvent({
    target: { value: "italic" }
  });

  expect(getStylePropertyValueFromEvent).toHaveReturnedWith("italic");
});

it("should update component on props change", () => {
  const { wrapper, disabled, value, selectedFonts, options } = setup();
  const shouldComponentUpdate = jest.spyOn(
    StylingPropertySelectList.prototype,
    "shouldComponentUpdate"
  );
  const props = {
    disabled,
    value,
    selectedFonts,
    options
  };
  const propsUpdates = {
    disabled: true,
    value: "Montserrat",
    selectedFonts: {},
    options: []
  };

  for (let prop in props) {
    expect(wrapper.instance().props[prop]).toEqual(props[prop]);

    wrapper.setProps({ [prop]: propsUpdates[prop] });

    expect(wrapper.instance().props[prop]).toEqual(propsUpdates[prop]);
    expect(shouldComponentUpdate).toHaveLastReturnedWith(true);
  }
});

it("should not update component on props change", () => {
  const { wrapper } = setup();
  const shouldComponentUpdate = jest.spyOn(
    StylingPropertySelectList.prototype,
    "shouldComponentUpdate"
  );

  wrapper.setProps({ updateElementStyles: jest.fn() });

  expect(shouldComponentUpdate).toHaveBeenCalledTimes(1);
  expect(shouldComponentUpdate).toHaveLastReturnedWith(false);
});

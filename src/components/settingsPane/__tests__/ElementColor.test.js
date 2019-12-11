import React from "react";
import { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";
import ElementColorConnected, { ElementColor } from "../ElementColor";
import { UPDATE_ELEMENT_STYLES } from "../../../constants";
import state from "../../../fixtures/state";

const setup = (renderFn = shallow, propsOverrides = {}, connected = false) => {
  const props = {
    color: "#333",
    disabled: false,
    element: "h1",
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
        <ElementColorConnected element={props.element} store={store} />
      )
    };
  }

  return {
    ...props,
    wrapper: renderFn(<ElementColor {...props} />)
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
  const { wrapper, color, disabled, element, updateElementStyles } = setup(
    mount
  );

  expect(typeof wrapper.prop("color")).toBe("string");
  expect(wrapper.prop("color")).toBe(color);

  expect(typeof wrapper.prop("disabled")).toBe("boolean");
  expect(wrapper.prop("disabled")).toBe(disabled);

  expect(typeof wrapper.prop("element")).toBe("string");
  expect(wrapper.prop("element")).toBe(element);

  expect(typeof wrapper.prop("updateElementStyles")).toBe("function");
  expect(wrapper.prop("updateElementStyles")).toBe(updateElementStyles);
});

it("should handle color change", () => {
  const { element, updateElementStyles, wrapper } = setup();

  wrapper.instance().handleColorChange({ hex: "#00ff00" });

  expect(updateElementStyles).toHaveBeenCalledTimes(1);
  expect(updateElementStyles).toHaveBeenLastCalledWith(element, "#00ff00");
});

it("should dispatch action", () => {
  const { store, wrapper } = setup(shallow, undefined, true);

  wrapper.prop("updateElementStyles")("h1", "#ffaa00");

  const actions = store.getActions();

  expect(actions).toContainEqual({
    type: UPDATE_ELEMENT_STYLES,
    element: "h1",
    property: "color",
    value: "#ffaa00"
  });
});

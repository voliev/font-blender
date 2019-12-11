import React from "react";
import { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";
import BackgroudConnected, { Background } from "../Background";
import { SET_BACKGROUND_COLOR } from "../../../constants";
import state from "../../../fixtures/state";
import background from "../../../fixtures/background";

const setup = (renderFn = shallow, propsOverrides = {}, connected = false) => {
  const props = {
    background,
    disabled: false,
    setBackgroundColor: jest.fn(),
    ...propsOverrides
  };

  if (connected) {
    const mockStore = configureStore();
    const store = mockStore(state);

    return {
      ...props,
      store,
      wrapper: renderFn(<BackgroudConnected store={store} />)
    };
  }

  return {
    ...props,
    wrapper: renderFn(<Background {...props} />)
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
  const { background, disabled, setBackgroundColor, wrapper } = setup(mount);

  expect(typeof wrapper.prop("background")).toBe("object");
  expect(wrapper.prop("background")).toEqual(background);

  expect(typeof wrapper.prop("disabled")).toBe("boolean");
  expect(wrapper.prop("disabled")).toBe(disabled);

  expect(typeof wrapper.prop("setBackgroundColor")).toBe("function");
  expect(wrapper.prop("setBackgroundColor")).toBe(setBackgroundColor);
});

it("should dispatch an action", () => {
  const { store, wrapper } = setup(mount, undefined, true);

  wrapper.find(Background).prop("setBackgroundColor")({ hex: "#ffddaa" });

  const actions = store.getActions();

  expect(actions).toContainEqual({
    type: SET_BACKGROUND_COLOR,
    color: "#ffddaa"
  });
});

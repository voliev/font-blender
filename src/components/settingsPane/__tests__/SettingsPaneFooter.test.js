import React from "react";
import { mount, shallow } from "enzyme";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import SettingsPaneFooterConnected, {
  SettingsPaneFooter
} from "../SettingsPaneFooter";
import { SET_DEFAULT_STATE, DISPLAY_STYLES } from "../../../constants";
import state from "../../../fixtures/state";

const setup = (renderFn = shallow, propsOverrides = {}, connected = false) => {
  const props = {
    isResetDisabled: false,
    isGetStylesDisabled: false,
    setDefaultStyles: jest.fn(),
    displayStyles: jest.fn(),
    ...propsOverrides
  };

  if (connected) {
    const mockStore = configureStore([thunk]);
    const store = mockStore(state);

    return {
      ...props,
      store,
      wrapper: renderFn(<SettingsPaneFooterConnected store={store} />)
    };
  }

  return {
    ...props,
    wrapper: renderFn(<SettingsPaneFooter {...props} />)
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
  const {
    wrapper,
    isResetDisabled,
    isGetStylesDisabled,
    setDefaultStyles,
    displayStyles
  } = setup(mount);

  expect(typeof wrapper.find(SettingsPaneFooter).prop("isResetDisabled")).toBe(
    "boolean"
  );
  expect(wrapper.find(SettingsPaneFooter).prop("isResetDisabled")).toBe(
    isResetDisabled
  );

  expect(
    typeof wrapper.find(SettingsPaneFooter).prop("isGetStylesDisabled")
  ).toBe("boolean");
  expect(wrapper.find(SettingsPaneFooter).prop("isGetStylesDisabled")).toBe(
    isGetStylesDisabled
  );

  expect(typeof wrapper.find(SettingsPaneFooter).prop("setDefaultStyles")).toBe(
    "function"
  );
  expect(wrapper.find(SettingsPaneFooter).prop("setDefaultStyles")).toBe(
    setDefaultStyles
  );

  expect(typeof wrapper.find(SettingsPaneFooter).prop("displayStyles")).toBe(
    "function"
  );
  expect(wrapper.find(SettingsPaneFooter).prop("displayStyles")).toBe(
    displayStyles
  );
});

it("should dispatch an action", () => {
  const { wrapper, store } = setup(shallow, undefined, true);

  wrapper.prop("setDefaultStyles")();
  wrapper.prop("displayStyles")();

  const actions = store.getActions();

  expect(actions).toContainEqual({
    type: SET_DEFAULT_STATE
  });
  expect(actions).toContainEqual({
    type: DISPLAY_STYLES
  });
});

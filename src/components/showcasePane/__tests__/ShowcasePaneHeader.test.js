import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import ShowcasePaneHeaderConnected, {
  ShowcasePaneHeader
} from "../ShowcasePaneHeader";
import { DISPLAY_SHOWCASE_TEXT } from "../../../constants";

const setup = (renderFn = shallow, propsOverrides = {}, connected = false) => {
  const props = {
    displayShowcaseText: jest.fn(),
    ...propsOverrides
  };

  if (connected) {
    const mockStore = configureStore();
    const store = mockStore();

    return {
      ...props,
      store,
      wrapper: renderFn(<ShowcasePaneHeaderConnected store={store} />)
    };
  }

  return {
    ...props,
    wrapper: renderFn(<ShowcasePaneHeader {...props} />)
  };
};

it("should render without crashing", () => {
  const { wrapper } = setup();

  expect(wrapper).toMatchSnapshot();
});

it("should handle button click", () => {
  const { displayShowcaseText, wrapper } = setup();

  wrapper.find("button").simulate("click");

  expect(displayShowcaseText).toHaveBeenCalledTimes(1);
});

it("should dispatch action", () => {
  const { store, wrapper } = setup(shallow, undefined, true);

  wrapper.prop("displayShowcaseText")();

  const actions = store.getActions();

  expect(actions).toContainEqual({ type: DISPLAY_SHOWCASE_TEXT });
});

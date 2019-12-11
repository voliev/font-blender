import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import SelectedFontsContainer from "../SelectedFontsContainer";
import SelectedFonts from "../SelectedFonts";
import {
  REMOVE_FONT_FROM_SELECTED,
  CLEAR_SELECTED_FONTS
} from "../../../constants";
import state from "../../../fixtures/state";

const setup = (renderFn = shallow) => {
  const mockStore = configureStore([thunk]);
  const store = mockStore(state);

  return {
    store,
    wrapper: renderFn(<SelectedFontsContainer store={store} />)
  };
};

it("should dispatch an action", () => {
  const { wrapper, store } = setup();

  wrapper.find(SelectedFonts).prop("removeFontFromSelected")("Lato");

  const actions = store.getActions();

  expect(actions).toContainEqual({
    type: REMOVE_FONT_FROM_SELECTED,
    family: "Lato"
  });
});

it("should dispatch an action", () => {
  const { wrapper, store } = setup();

  wrapper.find(SelectedFonts).prop("clearSelectedFonts")();

  const actions = store.getActions();

  expect(actions).toContainEqual({
    type: CLEAR_SELECTED_FONTS
  });
});

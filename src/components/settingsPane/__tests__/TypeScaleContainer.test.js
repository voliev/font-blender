import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import TypeScaleContainer from "../TypeScaleContainer";
import TypeScale from "../TypeScale";
import * as typeScale from "../../../actions/typeScale";
import { SET_FONT_SIZE, SET_TYPE_SCALE } from "../../../constants";
import state from "../../../fixtures/state";

it("should dispatch an action", () => {
  const mockStore = configureStore();
  const store = mockStore(state);
  const setFontSize = jest.spyOn(typeScale, "setFontSize");
  const setTypeScale = jest.spyOn(typeScale, "setTypeScale");
  const wrapper = shallow(<TypeScaleContainer store={store} />);

  wrapper.find(TypeScale).prop("setFontSize")(18);
  wrapper.find(TypeScale).prop("setTypeScale")(1.2);

  const actions = store.getActions();

  expect(setFontSize).toHaveBeenCalledTimes(1);
  expect(actions).toContainEqual({
    type: SET_FONT_SIZE,
    fontSize: 18
  });
  expect(setTypeScale).toHaveBeenCalledTimes(1);
  expect(actions).toContainEqual({
    type: SET_TYPE_SCALE,
    scale: 1.2
  });
});

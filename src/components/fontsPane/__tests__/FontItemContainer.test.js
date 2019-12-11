import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import FontItemContainer from "../FontItemContainer";
import * as fontsActions from "../../../actions/fonts";
import * as selectedFontsActions from "../../../actions/selectedFonts";
import * as showcaseActions from "../../../actions/showcase";
import state from "../../../fixtures/state";
import fonts from "../../../fixtures/fonts";

it("should call corresponding action creator", () => {
  const font = fonts["Roboto"];
  const mockStore = configureStore([thunk]);
  const store = mockStore(state);
  const actionCreators = [
    "startFetchFont",
    "startAddFontToSelected",
    "startRemoveFontFromSelected",
    "startDisplayShowcaseFontPreview"
  ];
  const modules = {
    startFetchFont: fontsActions,
    startAddFontToSelected: selectedFontsActions,
    startRemoveFontFromSelected: selectedFontsActions,
    startDisplayShowcaseFontPreview: showcaseActions
  };
  const props = {
    startFetchFont: "fetchFont",
    startAddFontToSelected: "addFontToSelected",
    startRemoveFontFromSelected: "removeFontFromSelected",
    startDisplayShowcaseFontPreview: "startDisplayShowcaseFontPreview"
  };

  const wrapper = shallow(
    <FontItemContainer font={font} isVisible={true} store={store} />
  );

  actionCreators.forEach(creator => {
    const mockFn = jest
      .spyOn(modules[creator], creator)
      .mockImplementation(family => () => family);

    wrapper.prop(props[creator])(font.family);

    expect(mockFn).toHaveBeenCalledTimes(1);
    if (creator === "startFetchFont") {
      expect(mockFn).toHaveBeenCalledWith(font.family, undefined);
    } else {
      expect(mockFn).toHaveBeenCalledWith(font.family);
    }
    expect(mockFn).toHaveReturnedWith(expect.any(Function));
  });
});

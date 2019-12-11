import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  displayShowcaseText,
  displayStyles,
  displayShowcaseFontPreview,
  startDisplayShowcaseFontPreview
} from "../../actions/showcase";
import * as fonts from "../../actions/fonts";
import {
  DISPLAY_SHOWCASE_TEXT,
  DISPLAY_STYLES,
  DISPLAY_SHOWCASE_FONT_PREVIEW
} from "../../constants";
import state from "../../fixtures/state";

const setup = () => {
  const mockStore = configureStore([thunk]);

  return {
    startFetchFont: jest
      .spyOn(fonts, "startFetchFont")
      .mockImplementation(family => () =>
        new Promise(resolve => resolve(family))
      ),
    store: mockStore(state)
  };
};

afterEach(() => {
  jest.clearAllMocks();
});

it("should generate showcase text action object", () => {
  const action = displayShowcaseText();

  expect(action).toEqual({
    type: DISPLAY_SHOWCASE_TEXT
  });
});

it("should generate styles display action object", () => {
  const action = displayStyles();

  expect(action).toEqual({
    type: DISPLAY_STYLES
  });
});

it("should generate font preview action object", () => {
  const family = "Roboto";
  const action = displayShowcaseFontPreview(family);

  expect(action).toEqual({
    type: DISPLAY_SHOWCASE_FONT_PREVIEW,
    family
  });
});

it("should generate font preview action object for unfetched font", () => {
  const { startFetchFont, store } = setup();
  const family = "Roboto";

  store.dispatch(startDisplayShowcaseFontPreview(family)).then(res => {
    const actions = store.getActions();

    expect(startFetchFont).toHaveBeenCalledTimes(1);
    expect(startFetchFont).toHaveBeenCalledWith(family);
    expect(actions).toContainEqual({
      type: DISPLAY_SHOWCASE_FONT_PREVIEW,
      family
    });
  });
});

it("should generate font preview action object for fetched font", () => {
  const { startFetchFont, store } = setup();
  const family = "Open Sans";

  store.dispatch(startDisplayShowcaseFontPreview(family));

  const actions = store.getActions();

  expect(startFetchFont).toHaveBeenCalledTimes(0);
  expect(actions).toContainEqual({
    type: DISPLAY_SHOWCASE_FONT_PREVIEW,
    family
  });
});

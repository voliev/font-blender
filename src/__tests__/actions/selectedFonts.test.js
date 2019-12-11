import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  addFontToSelected,
  removeFontFromSelected,
  clearSelectedFonts,
  startAddFontToSelected,
  undoDeselected,
  startRemoveFontFromSelected,
  startClearSelectedFonts,
  startUndoDeselected
} from "../../actions/selectedFonts";
import {
  ADD_SELECTED_FONT,
  REMOVE_FONT_FROM_SELECTED,
  CLEAR_SELECTED_FONTS,
  UNDO_DESELECTED,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from "../../constants";
import * as fonts from "../../actions/fonts";
import selectedFonts from "../../fixtures/selectedFonts";
import state from "../../fixtures/state";

const setup = (initialState = state) => {
  const mockStore = configureStore([thunk]);

  return {
    startFetchFont: jest
      .spyOn(fonts, "startFetchFont")
      .mockImplementation(family => () =>
        new Promise(resolve => resolve(family))
      ),
    store: mockStore(initialState)
  };
};

afterEach(() => {
  jest.clearAllMocks();
});

it("should generate action object to add font to selected", () => {
  const family = "Roboto";
  const action = addFontToSelected(family);

  expect(action).toEqual({
    type: ADD_SELECTED_FONT,
    family
  });
});

it("should generate action object to remove font from selected", () => {
  const family = "Roboto";
  const action = removeFontFromSelected(family);

  expect(action).toEqual({
    type: REMOVE_FONT_FROM_SELECTED,
    family
  });
});

it("should generate action object to clear list of selected fonts", () => {
  const action = clearSelectedFonts();

  expect(action).toEqual({
    type: CLEAR_SELECTED_FONTS
  });
});

it("should generate action object to undo all fonts deselction", () => {
  const action = undoDeselected();

  expect(action).toEqual({
    type: UNDO_DESELECTED
  });
});

it("should fetch font and add it to selected", () => {
  const { startFetchFont, store } = setup();
  const family = "Roboto";

  store.dispatch(startAddFontToSelected(family)).then(() => {
    const actions = store.getActions();

    expect(startFetchFont).toHaveBeenCalledTimes(1);
    expect(startFetchFont).toHaveBeenCalledWith(family);

    expect(actions).toContainEqual({
      type: ADD_SELECTED_FONT,
      family
    });
  });
});

it("should add fetched font to selected", () => {
  const { startFetchFont, store } = setup();
  const family = "Open Sans";

  store.dispatch(startAddFontToSelected(family));

  const actions = store.getActions();

  expect(startFetchFont).toHaveBeenCalledTimes(0);

  expect(actions).toContainEqual({
    type: ADD_SELECTED_FONT,
    family
  });
});

it("should remove font from selected and add notificaiton", () => {
  const { store } = setup();
  const family = "Roboto";

  store.dispatch(startRemoveFontFromSelected(family));

  const actions = store.getActions();

  expect(actions).toContainEqual({
    type: REMOVE_FONT_FROM_SELECTED,
    family
  });

  expect(actions).toContainEqual({
    type: ADD_NOTIFICATION,
    text: `${family} font family has been removed`,
    group: "selectedFonts"
  });
});

it("should clear list of selected fonts and add notificaiton", () => {
  const { store } = setup();

  store.dispatch(startClearSelectedFonts());

  let actions = store.getActions();

  expect(actions).toContainEqual({
    type: CLEAR_SELECTED_FONTS
  });

  expect(actions).toContainEqual({
    type: ADD_NOTIFICATION,
    text: `${selectedFonts.length} font families have been removed`,
    group: "selectedFonts"
  });

  const { store: updatedStore } = setup({
    ...state,
    selectedFonts: {
      present: [selectedFonts[0]]
    }
  });

  updatedStore.dispatch(startClearSelectedFonts());

  actions = updatedStore.getActions();

  expect(actions).toContainEqual({
    type: ADD_NOTIFICATION,
    text: `1 font family have been removed`,
    group: "selectedFonts"
  });
});

it("should undo fonts deselection and remove notification", () => {
  const { store } = setup();

  store.dispatch(startUndoDeselected());

  const actions = store.getActions();

  expect(actions).toContainEqual({
    type: UNDO_DESELECTED
  });
  expect(actions).toContainEqual({
    type: REMOVE_NOTIFICATION,
    group: "selectedFonts"
  });
});

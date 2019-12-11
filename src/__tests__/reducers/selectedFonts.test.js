import {
  selectedFonts as selectedFontsReducer,
  getSelectedFontFamilies,
  getSelectedFonts,
  isSelected
} from "../../reducers/selectedFonts";
import {
  ADD_SELECTED_FONT,
  REMOVE_FONT_FROM_SELECTED,
  CLEAR_SELECTED_FONTS
} from "../../constants";
import selectedFonts from "../../fixtures/selectedFonts";
import fonts from "../../fixtures/fonts";
import state from "../../fixtures/state";

it("should set default state", () => {
  const state = selectedFontsReducer(undefined, { type: "@@INIT" });

  expect(state).toEqual([]);
});

it("should add font to selected", () => {
  const state = selectedFontsReducer(selectedFonts, {
    type: ADD_SELECTED_FONT,
    family: "Roboto"
  });

  expect(state).toEqual([...selectedFonts, "Roboto"]);
});

it("should rmeove font from selected", () => {
  const state = selectedFontsReducer(selectedFonts, {
    type: REMOVE_FONT_FROM_SELECTED,
    family: "Lato"
  });

  expect(state).toEqual(selectedFonts.filter(family => family !== "Lato"));
});

it("should clear selected fonts list", () => {
  const state = selectedFontsReducer(selectedFonts, {
    type: CLEAR_SELECTED_FONTS
  });

  expect(state).toEqual([]);
});

it("should return array of selected fonts", () => {
  const result = getSelectedFontFamilies(state);

  expect(result).toEqual(selectedFonts);
});

it("should return object of selected fonts", () => {
  const result = getSelectedFonts(state);
  const expectedSelectedFonts = selectedFonts.reduce((selected, family) => {
    selected[family] = fonts[family];
    return selected;
  }, {});

  expect(result).toEqual(expectedSelectedFonts);
});

it("should return whether the font is selected", () => {
  expect(isSelected(state, "Roboto")).toBeFalsy();
  expect(isSelected(state, "Lato")).toBeTruthy();
});

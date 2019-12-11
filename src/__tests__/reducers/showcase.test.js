import showcaseReducer from "../../reducers/showcase";
import {
  DISPLAY_SHOWCASE_TEXT,
  DISPLAY_STYLES,
  DISPLAY_SHOWCASE_FONT_PREVIEW
} from "../../constants";
import { initialShowcaseState as showcase } from "../../fixtures/showcase";

it("should set default state", () => {
  const state = showcaseReducer(undefined, { type: "@@INIT" });

  expect(state).toEqual(showcase);
});

it("should set display showcase text", () => {
  const state = showcaseReducer(showcase, {
    type: DISPLAY_SHOWCASE_TEXT
  });

  expect(state).toEqual({
    ...state,
    text: { isVisible: true }
  });
});

it("should set display showcase font preview", () => {
  const family = "Roboto";
  const state = showcaseReducer(showcase, {
    type: DISPLAY_SHOWCASE_FONT_PREVIEW,
    family
  });

  expect(state).toEqual({
    ...state,
    fontPreview: {
      isVisible: true,
      family
    }
  });
});

it("should set display styles", () => {
  const state = showcaseReducer(showcase, {
    type: DISPLAY_STYLES
  });

  expect(state).toEqual({
    ...state,
    styles: {
      isVisible: true
    }
  });
});

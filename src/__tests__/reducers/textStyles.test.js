import configureStore from "redux-mock-store";
import textStylesReducer, {
  getTextStyles,
  getTextStylesDefaultState
} from "../../reducers/textStyles";
import {
  ELEMENTS,
  SET_DEFAULT_STATE,
  SET_STYLES_INHERITANCE,
  UPDATE_ELEMENT_STYLES
} from "../../constants";
import fonts from "../../fixtures/fonts";
import textStyles from "../../fixtures/textStyles";

it("should set default state", () => {
  const state = textStylesReducer(undefined, { type: "@@INIT" });

  expect(state).toEqual(textStyles);
});

it("should set styles inheritance state", () => {
  ELEMENTS.forEach(element => {
    if (element !== "body") {
      expect(textStyles[element].inheritStyles).toBeTruthy();
    }
  });

  const state = textStylesReducer(textStyles, {
    type: SET_STYLES_INHERITANCE,
    element: "h1"
  });

  expect(state["h1"].inheritStyles).toBeFalsy();
});

it("should inherit styles from `body` element by default", () => {
  let state = textStylesReducer(undefined, { type: "@@INIT" });

  ELEMENTS.forEach(element => {
    if (element !== "body") {
      expect(state[element]).toMatchObject(state["body"]);
    }
  });

  state = textStylesReducer(textStyles, {
    type: UPDATE_ELEMENT_STYLES,
    element: "body",
    property: "font-family",
    value: fonts["Roboto"]
  });

  ELEMENTS.forEach(element => {
    if (element !== "body") {
      expect(state[element]).not.toEqual(textStyles[element]);
      expect(state[element]).toMatchObject(state["body"]);
      expect(state[element].fontFamily).toBe(state["body"].fontFamily);
    }
  });

  state = textStylesReducer(state, {
    type: UPDATE_ELEMENT_STYLES,
    element: "body",
    property: "font-weight",
    value: 700
  });

  ELEMENTS.forEach(element => {
    if (element !== "body") {
      expect(state[element]).toMatchObject(state["body"]);
      expect(state[element].fontWeight).toBe(state["body"].fontWeight);
    }
  });

  state = textStylesReducer(state, {
    type: UPDATE_ELEMENT_STYLES,
    element: "body",
    property: "color",
    value: "#ff0000"
  });

  ELEMENTS.forEach(element => {
    if (element !== "body") {
      expect(state[element]).toMatchObject(state["body"]);
      expect(state[element].color).toBe(state["body"].color);
    }
  });
});

it("should get `body` element styles on inheritance property change", () => {
  let state = textStylesReducer(textStyles, {
    type: SET_STYLES_INHERITANCE,
    element: "h2"
  });

  expect(state["h2"].inheritStyles).toBeFalsy();

  state = textStylesReducer(state, {
    type: UPDATE_ELEMENT_STYLES,
    element: "h2",
    property: "font-family",
    value: fonts["Lato"]
  });

  expect(state["h2"]).not.toMatchObject(state["body"]);
  expect(state["h2"].fontFamily).toBe("Lato");
  expect(state["h2"].fontWeight).toBe(400);

  state = textStylesReducer(state, {
    type: UPDATE_ELEMENT_STYLES,
    element: "h2",
    property: "font-weight",
    value: 300
  });

  expect(state["h2"].fontWeight).toBe(300);

  state = textStylesReducer(state, {
    type: SET_STYLES_INHERITANCE,
    element: "h2"
  });

  expect(state["h2"].inheritStyles).toBeTruthy();
  expect(state["h2"]).toMatchObject(state["body"]);
  expect(state["h2"].fontFamily).not.toBe("Lato");
  expect(state["h2"].fontWeight).not.toBe(300);
});

it("should update element styles", () => {
  let state = textStylesReducer(textStyles, {
    type: SET_STYLES_INHERITANCE,
    element: "h3"
  });

  expect(state["h3"].inheritStyles).toBeFalsy();

  state = textStylesReducer(state, {
    type: UPDATE_ELEMENT_STYLES,
    element: "h3",
    property: "font-family",
    value: fonts["Montserrat"]
  });

  expect(state["h3"].fontFamily).toBe("Montserrat");

  state = textStylesReducer(state, {
    type: UPDATE_ELEMENT_STYLES,
    element: "h3",
    property: "font-style",
    value: "italic"
  });

  expect(state["h3"].fontStyle).toBe("italic");

  state = textStylesReducer(state, {
    type: UPDATE_ELEMENT_STYLES,
    element: "h3",
    property: "font-weight",
    value: 700
  });

  expect(state["h3"].fontWeight).toBe(700);
});

it("should return default state", () => {
  expect(getTextStylesDefaultState()).toEqual(textStyles);
});

it("should set default state", () => {
  let state = textStylesReducer(textStyles, {
    type: UPDATE_ELEMENT_STYLES,
    element: "body",
    property: "font-family",
    value: fonts["Raleway"]
  });

  expect(state).not.toEqual(getTextStylesDefaultState());

  state = textStylesReducer(state, {
    type: SET_DEFAULT_STATE
  });

  expect(state).toEqual(getTextStylesDefaultState());
});

it("should set default `font-style` and `font-weight` values on default font", () => {
  let state = textStylesReducer(textStyles, {
    type: UPDATE_ELEMENT_STYLES,
    element: "body",
    property: "font-family",
    value: fonts["Raleway"]
  });

  state = textStylesReducer(state, {
    type: UPDATE_ELEMENT_STYLES,
    element: "body",
    property: "font-style",
    value: "italic"
  });

  state = textStylesReducer(state, {
    type: UPDATE_ELEMENT_STYLES,
    element: "body",
    property: "font-weight",
    value: 700
  });

  expect(state["body"].fontFamily).toBe("Raleway");
  expect(state["body"].fontStyle).toBe("italic");
  expect(state["body"].fontWeight).toBe(700);

  state = textStylesReducer(state, {
    type: UPDATE_ELEMENT_STYLES,
    element: "body",
    property: "font-family",
    value: "default"
  });

  expect(state["body"].fontFamily).toBe(textStyles["body"].fontFamily);
  expect(state["body"].fontStyle).toBe(textStyles["body"].fontStyle);
  expect(state["body"].fontWeight).toBe(textStyles["body"].fontWeight);
});

it("should return current textStyles state", () => {
  const mockStore = configureStore();
  const store = mockStore({
    styles: {
      present: { textStyles }
    }
  });
  const state = store.getState();
  const textStylesState = getTextStyles(state);

  expect(textStylesState).toEqual(textStyles);
});

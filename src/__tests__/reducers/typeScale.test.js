import typeScaleReducer, {
  getTypeScaleDefaultState
} from "../../reducers/typeScale";
import {
  SET_DEFAULT_STATE,
  SET_FONT_SIZE,
  SET_TYPE_SCALE
} from "../../constants";
import typeScale from "../../fixtures/typeScale";

it("should set default state", () => {
  const state = typeScaleReducer(undefined, { type: "@@INIT" });

  expect(state).toEqual(typeScale);
});

it("should set type scale", () => {
  const state = typeScaleReducer(typeScale, {
    type: SET_TYPE_SCALE,
    scale: 1.2
  });

  expect(state.scale).not.toBe(typeScale.scale);
  expect(state.scale).toBe(1.2);
});

it("should set font size", () => {
  const state = typeScaleReducer(typeScale, {
    type: SET_FONT_SIZE,
    fontSize: 18
  });

  expect(state.fontSize).not.toBe(typeScale.fontSize);
  expect(state.fontSize).toBe(18);
});

it("should set default state", () => {
  let state = typeScaleReducer(typeScale, {
    type: SET_FONT_SIZE,
    fontSize: 18
  });

  expect(state.fontSize).not.toBe(typeScale.fontSize);
  expect(state.fontSize).toBe(18);

  state = typeScaleReducer(state, {
    type: SET_TYPE_SCALE,
    scale: 1.2
  });

  expect(state.scale).not.toBe(typeScale.scale);
  expect(state.scale).toBe(1.2);

  state = typeScaleReducer(state, {
    type: SET_DEFAULT_STATE
  });

  expect(state).toEqual(typeScale);
});

it("should return default state", () => {
  expect(getTypeScaleDefaultState()).toEqual(typeScale);
});

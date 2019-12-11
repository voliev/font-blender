import {
  setTypeScale,
  setFontSize,
  setDefaultTypeScaleState
} from "../../actions/typeScale";
import {
  SET_DEFAULT_TYPE_SCALE_STATE,
  SET_FONT_SIZE,
  SET_TYPE_SCALE
} from "../../constants";

it("should generate type scale action object", () => {
  const scale = 1.2;
  const action = setTypeScale(scale);

  expect(action).toEqual({
    type: SET_TYPE_SCALE,
    scale
  });
});

it("should generate type scale action object with default value", () => {
  const action = setTypeScale();

  expect(action).toEqual({
    type: SET_TYPE_SCALE,
    scale: 1.414
  });
});

it("should generate font size action object", () => {
  const fontSize = 18;
  const action = setFontSize(18);

  expect(action).toEqual({
    type: SET_FONT_SIZE,
    fontSize
  });
});

it("should generate action object with default value", () => {
  const action = setFontSize();

  expect(action).toEqual({
    type: SET_FONT_SIZE,
    fontSize: 16
  });
});

it("should generate default type scale state action object", () => {
  const action = setDefaultTypeScaleState();

  expect(action).toEqual({
    type: SET_DEFAULT_TYPE_SCALE_STATE
  });
});

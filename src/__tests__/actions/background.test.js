import { setBackgroundColor } from "../../actions/background";
import { SET_BACKGROUND_COLOR } from "../../constants";

it("should generate background color action object", () => {
  const color = "#f104c3";
  const action = setBackgroundColor(color);
  expect(action).toEqual({
    type: SET_BACKGROUND_COLOR,
    color
  });
});

it("should generate action object if color is `undefined`", () => {
  const action = setBackgroundColor();

  expect(action).toEqual({
    type: SET_BACKGROUND_COLOR,
    color: "#fff"
  });
});

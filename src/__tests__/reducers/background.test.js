import backgroundReducer, {
  getBackgroundDefaultState
} from "../../reducers/background";
import { SET_BACKGROUND_COLOR, SET_DEFAULT_STATE } from "../../constants";

it("should set default state", () => {
  const state = backgroundReducer(undefined, { type: "@@INIT" });

  expect(state).toEqual({ color: "#fff" });
});

it("should set background color", () => {
  const state = { color: "#fff" };
  const updatedState = backgroundReducer(state, {
    type: SET_BACKGROUND_COLOR,
    color: "#0f0"
  });

  expect(updatedState).toEqual({ color: "#0f0" });
});

it("should set default background state", () => {
  const state = { color: "#31fa5b" };
  const updatedState = backgroundReducer(state, {
    type: SET_DEFAULT_STATE
  });

  expect(updatedState).toEqual({ color: "#fff" });
});

it("should return default background state", () => {
  const state = getBackgroundDefaultState();

  expect(state).toEqual({ color: "#fff" });
});

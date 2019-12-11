import {
  all as fontsReducer,
  fontsDataStatus as fontsDataStatusReducer
} from "../../reducers/fonts";
import {
  FETCH_FONTS_DATA,
  FETCH_FONTS_DATA_SUCCESS,
  FETCH_FONTS_DATA_FAILURE,
  SET_FONTS,
  UPDATE_FONT
} from "../../constants";
import fonts from "../../fixtures/fonts";

describe("fontsReducer", () => {
  it("should set default state", () => {
    expect(fontsReducer(undefined, { type: "@@INIT" })).toEqual({});
  });

  it("should set fonts", () => {
    expect(
      fontsReducer(undefined, {
        type: SET_FONTS,
        fonts
      })
    ).toEqual(fonts);
  });

  it("should update font", () => {
    const state = fontsReducer(undefined, {
      type: SET_FONTS,
      fonts
    });

    expect(state).toEqual(fonts);

    const updatedState = fontsReducer(state, {
      type: UPDATE_FONT,
      family: "Roboto",
      updates: {
        fetching: true,
        requested: true
      }
    });

    expect(state.Roboto).not.toEqual(updatedState.Roboto);
    expect(updatedState.Roboto).toEqual({
      ...state.Roboto,
      fetching: true,
      requested: true
    });
  });
});

describe("fontsDataStatusReducer", () => {
  it("should set default state", () => {
    expect(fontsDataStatusReducer(undefined, { type: "@@INIT" })).toBe("");
  });

  it("should set status to 'fetching'", () => {
    expect(fontsDataStatusReducer(undefined, { type: FETCH_FONTS_DATA })).toBe(
      "fetching"
    );
  });

  it("should set status to 'success'", () => {
    expect(
      fontsDataStatusReducer(undefined, { type: FETCH_FONTS_DATA_SUCCESS })
    ).toBe("success");
  });

  it("should set status to 'failure'", () => {
    expect(
      fontsDataStatusReducer(undefined, { type: FETCH_FONTS_DATA_FAILURE })
    ).toBe("failure");
  });
});

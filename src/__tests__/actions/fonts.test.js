import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import WebFont from "webfontloader";
import {
  getEventListener,
  generateRequestOptions,
  generateRequestString,
  setFonts,
  startFetchFont,
  startFetchFontsData,
  updateFont
} from "../../actions/fonts";
import {
  FETCH_FONTS_DATA,
  FETCH_FONTS_DATA_SUCCESS,
  FETCH_FONTS_DATA_FAILURE,
  SET_FONTS,
  UPDATE_FONT,
  CHAR_RANGE
} from "../../constants";
import fonts from "../../fixtures/fonts";
import state from "../../fixtures/state";
import response from "../../fixtures/webfonts.json";

jest.mock("webfontloader");

const setup = (initialState = state) => {
  const mockStore = configureStore([thunk]);
  const store = mockStore(initialState);

  return store;
};

afterEach(() => {
  jest.clearAllMocks();
});

it("should request fonts data and handle response", () => {
  fetch.mockResponse(JSON.stringify(response));

  const store = setup({});

  store.dispatch(startFetchFontsData()).then(() => {
    const actions = store.getActions();

    expect(actions).toContainEqual({
      type: FETCH_FONTS_DATA
    });
    expect(actions).toContainEqual({
      type: FETCH_FONTS_DATA_SUCCESS
    });

    const fontDefaults = {
      fetching: false,
      active: false,
      requested: false,
      prefetched: false,
      fetched: false
    };

    expect(actions).toContainEqual({
      type: SET_FONTS,
      fonts: {
        Fondamento: {
          family: "Fondamento",
          category: "handwriting",
          variants: ["regular", "italic"],
          subsets: ["latin-ext", "latin"],
          ...fontDefaults
        },
        Oregano: {
          family: "Oregano",
          category: "display",
          variants: ["regular", "italic"],
          subsets: ["latin-ext", "latin"],
          ...fontDefaults
        }
      }
    });
  });
});

it("should request fonts data and handle failure", () => {
  fetch.mockResponse();

  const store = setup({});

  store.dispatch(startFetchFontsData()).then(() => {
    const actions = store.getActions();

    expect(actions).toContainEqual({
      type: FETCH_FONTS_DATA
    });
    expect(actions).toContainEqual({
      type: FETCH_FONTS_DATA_FAILURE
    });
    expect(actions).toContainEqual({
      type: SET_FONTS,
      fonts: {}
    });
  });
});

it("should generate action object to set fonts", () => {
  const action = setFonts(fonts);

  expect(action).toEqual({
    type: SET_FONTS,
    fonts
  });
});

it("should generate action object to update font", () => {
  const family = "Roboto";
  const updates = { requested: true };
  const action = updateFont(family, updates);

  expect(action).toEqual({
    type: UPDATE_FONT,
    family,
    updates
  });
});

it("should call load method on WebFont object with character range", () => {
  const store = setup();
  const font = fonts["Lato"];
  const requestString = generateRequestString(font, false);

  store.dispatch(startFetchFont(font.family, CHAR_RANGE));

  expect(WebFont.load).toHaveBeenCalledTimes(1);
  expect(WebFont.load).toHaveBeenCalledWith({
    google: {
      families: [requestString],
      text: CHAR_RANGE
    },
    classes: false,
    timeout: 10000,
    fontloading: expect.any(Function),
    fontactive: expect.any(Function),
    fontinactive: expect.any(Function)
  });
});

it("should call load method on WebFont object without character range", () => {
  const store = setup();
  const font = fonts["Lato"];
  const requestString = generateRequestString(font, true);

  store.dispatch(startFetchFont(font.family, undefined));

  expect(WebFont.load).toHaveBeenCalledTimes(1);
  expect(WebFont.load).toHaveBeenCalledWith({
    google: {
      families: [requestString],
      text: undefined
    },
    classes: false,
    timeout: 10000,
    fontloading: expect.any(Function),
    fontactive: expect.any(Function),
    fontinactive: expect.any(Function)
  });
});

it("should generate options object to fetch all font variants", () => {
  const store = setup();
  const requestString = generateRequestString(fonts["Roboto"], true);

  expect(
    generateRequestOptions(requestString, undefined, store.dispatch)
  ).toEqual({
    google: {
      families: [requestString],
      text: undefined
    },
    classes: false,
    timeout: 10000,
    fontloading: expect.any(Function),
    fontactive: expect.any(Function),
    fontinactive: expect.any(Function)
  });
});

it("should generate options object to prefetch font", () => {
  const store = setup();
  const requestString = generateRequestString(fonts["Roboto"], false);

  expect(
    generateRequestOptions(requestString, CHAR_RANGE, store.dispatch)
  ).toEqual({
    google: {
      families: [requestString],
      text: CHAR_RANGE
    },
    classes: false,
    timeout: 10000,
    fontloading: expect.any(Function),
    fontactive: expect.any(Function),
    fontinactive: expect.any(Function)
  });
});

it("should return function event listener", () => {
  const store = setup();
  const events = ["fontloading", "fontactive", "fontinactive"];

  events.forEach(event => {
    expect(getEventListener(event, store.dispatch, CHAR_RANGE)).toEqual(
      expect.any(Function)
    );
  });

  events.forEach(event => {
    expect(getEventListener(event, store.dispatch)).toEqual(
      expect.any(Function)
    );
  });
});

it("should update font on WebFont loader event of font prefetching", () => {
  const store = setup();
  const events = ["fontloading", "fontactive", "fontinactive"];
  const family = "Lato";

  events.forEach(event => {
    const listener = getEventListener(event, store.dispatch, CHAR_RANGE);

    listener(family);

    const actions = store.getActions();
    const updates = {
      fontloading: {
        fetching: true,
        requested: true
      },
      fontactive: {
        fetching: false,
        active: true,
        prefetched: true
      },
      fontinactive: {
        fetching: false,
        active: false
      }
    };

    expect(actions[actions.length - 1]).toEqual({
      type: UPDATE_FONT,
      family,
      updates: updates[event]
    });
  });
});

it("should update font on WebFont loader event of font fetching", () => {
  const store = setup();
  const events = ["fontloading", "fontactive", "fontinactive"];
  const family = "Lato";

  events.forEach(event => {
    const listener = getEventListener(event, store.dispatch, undefined);

    listener(family);

    const actions = store.getActions();
    const updates = {
      fontloading: { fetching: true },
      fontactive: {
        active: true,
        fetching: false,
        fetched: true
      },
      fontinactive: { fetching: false }
    };

    expect(actions[actions.length - 1]).toEqual({
      type: UPDATE_FONT,
      family,
      updates: updates[event]
    });
  });
});

it("should generate request string", () => {
  expect(generateRequestString(fonts["Lato"], true)).toBe(
    "Lato:100,100italic,300,300italic,regular,italic,700,700italic,900,900italic"
  );

  expect(generateRequestString(fonts["Slabo 27px"], true)).toBe(
    "Slabo 27px:regular"
  );

  expect(generateRequestString(fonts["Roboto Slab"], true)).toBe(
    "Roboto Slab:100,300,regular,700"
  );

  expect(generateRequestString(fonts["Lato"])).toBe("Lato:400:latin");

  expect(generateRequestString(fonts["Slabo 27px"])).toBe(
    "Slabo 27px:400:latin"
  );

  expect(generateRequestString(fonts["Open Sans Condensed"])).toBe(
    "Open Sans Condensed:300:latin"
  );

  expect(generateRequestString(fonts["Nokora"])).toBe("Nokora:400:khmer");
});

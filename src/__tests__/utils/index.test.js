import * as utils from "../../utils";
import { getSelectedFonts } from "../../reducers/selectedFonts";
import fonts from "../../fixtures/fonts";
import selectedFonts from "../../fixtures/selectedFonts";
import { showcaseState } from "../../fixtures/showcase";
import typeScale from "../../fixtures/typeScale";
import textStyles, * as elements from "../../fixtures/textStyles";

import state from "../../fixtures/state";

describe("variantToStyle", () => {
  it("should transform font variant to CSS style properties", () => {
    expect(utils.variantToStyle("500italic")).toBe("italic 500");
    expect(utils.variantToStyle("regular")).toBe("normal");
    expect(utils.variantToStyle("500")).toBe("500");
    expect(utils.variantToStyle("italic")).toBe("italic");
  });
});

describe("cssPropertyToCamelCased", () => {
  it("should transform css property to to camel cased string", () => {
    expect(utils.cssPropertyToCamelCased("font-family")).toBe("fontFamily");
    expect(utils.cssPropertyToCamelCased("font-style")).toBe("fontStyle");
    expect(utils.cssPropertyToCamelCased("font-weight")).toBe("fontWeight");
  });
});

describe("isPropTypeHexColor", () => {
  const isPropTypeHexColor = jest.spyOn(utils, "isPropTypeHexColor");

  afterEach(() => {
    isPropTypeHexColor.mockClear();
  });

  it("should return `undefined` for correct hex color string", () => {
    utils.isPropTypeHexColor({ color: "#fff" }, "color", "Component");

    expect(isPropTypeHexColor).toHaveLastReturnedWith(undefined);

    utils.isPropTypeHexColor({ color: "#f1a377" }, "color", "Component");

    expect(isPropTypeHexColor).toHaveLastReturnedWith(undefined);
  });

  it("should throw an error for incorrect hex color string", () => {
    utils.isPropTypeHexColor({ color: "#notAColor" }, "color", "Component");

    expect(isPropTypeHexColor).toHaveReturnedWith(
      new Error(
        "Invalid prop `color` supplied to `Component`. Validation failed."
      )
    );
  });
});

describe("numberInputChangeHandler", () => {
  const cb = jest.fn();

  afterEach(() => {
    cb.mockClear();
  });

  it("should call callback function with default value", () => {
    utils.numberInputChangeHandler("test", 16, 1, 100, cb);

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(16);
  });

  it("should call callback function with provided value", () => {
    utils.numberInputChangeHandler("18", 16, 1, 100, cb);

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(18);
  });

  it("should call callback function with trimmed value (no last digit)", () => {
    utils.numberInputChangeHandler("110", 16, 1, 100, cb);

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(11);
  });

  it("should call callback function with minimal value", () => {
    utils.numberInputChangeHandler("0", 16, 1, 100, cb);

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(1);
  });

  it("should call callback function with maximum value", () => {
    utils.numberInputChangeHandler("100", 16, 1, 100, cb);

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(100);
  });

  it("should call callback function with minimal value", () => {
    utils.numberInputChangeHandler("", 16, 1, 100, cb);

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(1);
  });
});

describe("getDefaultVariant", () => {
  const getDefaultVariant = jest.spyOn(utils, "getDefaultVariant");

  it("should return correct object for provided variants", () => {
    utils.getDefaultVariant();

    expect(getDefaultVariant).toHaveLastReturnedWith({});

    utils.getDefaultVariant(["regular", "italic"]);

    expect(getDefaultVariant).toHaveLastReturnedWith({
      style: "normal",
      weight: 400
    });

    utils.getDefaultVariant(["italic", "500italic"]);

    expect(getDefaultVariant).toHaveLastReturnedWith({
      style: "italic",
      weight: 400
    });

    utils.getDefaultVariant(["300italic", "700italic"]);

    expect(getDefaultVariant).toHaveLastReturnedWith({
      style: "italic",
      weight: 300
    });

    utils.getDefaultVariant(["300", "700"]);

    expect(getDefaultVariant).toHaveLastReturnedWith({
      style: "normal",
      weight: 300
    });
  });
});

describe("isControlDisabled", () => {
  const isControlDisabled = jest.spyOn(utils, "isControlDisabled");

  afterEach(() => {
    isControlDisabled.mockClear();
  });

  it("should return `true`", () => {
    utils.isControlDisabled(state, true);

    expect(isControlDisabled).toHaveReturnedWith(true);
  });

  it("should return `true`", () => {
    const updatedState = {
      ...state,
      showcase: {
        ...showcaseState,
        styles: {
          isVisible: true
        }
      }
    };

    utils.isControlDisabled(updatedState, false);

    expect(isControlDisabled).toHaveReturnedWith(true);
  });

  it("should return `false`", () => {
    utils.isControlDisabled(state, false);

    expect(isControlDisabled).toHaveReturnedWith(false);
  });
});

describe("getPropertyValue", () => {
  const getPropertyValue = jest.spyOn(utils, "getPropertyValue");
  const updatedTextStyles = {
    ...textStyles,
    body: {
      ...elements.body,
      fontFamily: "Roboto"
    },
    h1: {
      ...elements.h1,
      fontStyle: "italic"
    },
    h2: {
      ...elements.h2,
      fontWeight: "700"
    }
  };

  it("should return current `font-family` value", () => {
    utils.getPropertyValue(updatedTextStyles, "body", "font-family");
    expect(getPropertyValue).toHaveLastReturnedWith("Roboto");
  });

  it("should return current `font-style` value", () => {
    utils.getPropertyValue(updatedTextStyles, "h1", "font-style");
    expect(getPropertyValue).toHaveLastReturnedWith("italic");
  });

  it("should return current `font-weight` value", () => {
    utils.getPropertyValue(updatedTextStyles, "h2", "font-weight");
    expect(getPropertyValue).toHaveLastReturnedWith("700");
  });
});

describe("getPropertyOptions", () => {
  const getPropertyOptions = jest.spyOn(utils, "getPropertyOptions");
  const selectedFontsSorted = selectedFonts.sort((a, b) =>
    a.localeCompare(b, {}, { caseFirst: "upper" })
  );

  afterEach(() => {
    getPropertyOptions.mockClear();
  });

  it("should return select list options for `font-family`", () => {
    utils.getPropertyOptions(
      "font-family",
      "body",
      textStyles,
      getSelectedFonts(state)
    );
    expect(getPropertyOptions).toHaveLastReturnedWith(selectedFontsSorted);

    utils.getPropertyOptions("font-family", "body", textStyles, {});
    expect(getPropertyOptions).toHaveLastReturnedWith([]);
  });

  it("should return select list options for `font-style`", () => {
    utils.getPropertyOptions(
      "font-style",
      "h1",
      textStyles,
      getSelectedFonts(state)
    );
    expect(getPropertyOptions).toHaveLastReturnedWith(undefined);

    const updatedTextStyles = {
      ...textStyles,
      h1: {
        ...elements.h1,
        fontFamily: "Lato"
      }
    };

    utils.getPropertyOptions(
      "font-style",
      "h1",
      updatedTextStyles,
      getSelectedFonts(state)
    );
    expect(getPropertyOptions).toHaveLastReturnedWith(["normal", "italic"]);
  });

  it("should return select list options for `font-weight`", () => {
    utils.getPropertyOptions(
      "font-weight",
      "h2",
      textStyles,
      getSelectedFonts(state)
    );
    expect(getPropertyOptions).toHaveLastReturnedWith(undefined);

    const updatedTextStyles = {
      ...textStyles,
      h2: {
        ...elements.h2,
        fontFamily: "Roboto Condensed"
      }
    };
    utils.getPropertyOptions(
      "font-weight",
      "h2",
      updatedTextStyles,
      getSelectedFonts(state)
    );
    expect(getPropertyOptions).toHaveLastReturnedWith(["300", "400", "700"]);
  });
});

describe("generateElementsStyles", () => {
  const generateElementsStyles = jest.spyOn(utils, "generateElementsStyles");

  afterEach(() => {
    generateElementsStyles.mockClear();
  });

  it("should generate object with element styles", () => {
    const updatedTextStyles = {
      ...textStyles,
      body: {
        ...elements.body,
        fontFamily: "Roboto"
      },
      h1: {
        ...elements.h1,
        fontFamily: "Lato",
        fontStyle: "italic"
      },
      h2: {
        ...elements.h2,
        fontFamily: "Source Sans Pro",
        fontWeight: 700
      }
    };

    utils.generateElementsStyles(typeScale, updatedTextStyles, fonts);

    const elementStylesObject = {
      color: "#333",
      fontFamily: "sans-serif",
      fontSize: "16.00px",
      fontStyle: "normal",
      fontWeight: 400
    };
    const expectedElementsStyles = {
      body: {
        ...elementStylesObject,
        fontFamily: "'Roboto', 'sans-serif'",
        fontSize: `${(
          Math.pow(typeScale.scale, 0) * typeScale.fontSize
        ).toFixed(2)}px`
      },
      h1: {
        ...elementStylesObject,
        fontFamily: "'Lato', 'sans-serif'",
        fontSize: `${(
          Math.pow(typeScale.scale, 4) * typeScale.fontSize
        ).toFixed(2)}px`,
        fontStyle: "italic"
      },
      h2: {
        ...elementStylesObject,
        fontFamily: "'Source Sans Pro', 'sans-serif'",
        fontSize: `${(
          Math.pow(typeScale.scale, 3) * typeScale.fontSize
        ).toFixed(2)}px`,
        fontWeight: 700
      },
      h3: {
        ...elementStylesObject,
        fontSize: `${(
          Math.pow(typeScale.scale, 2) * typeScale.fontSize
        ).toFixed(2)}px`
      },
      h4: {
        ...elementStylesObject,
        fontSize: `${(
          Math.pow(typeScale.scale, 1) * typeScale.fontSize
        ).toFixed(2)}px`
      },
      li: {
        ...elementStylesObject,
        fontSize: `${(
          Math.pow(typeScale.scale, 0) * typeScale.fontSize
        ).toFixed(2)}px`
      },
      small: {
        ...elementStylesObject,
        fontSize: `${(
          Math.pow(typeScale.scale, -1) * typeScale.fontSize
        ).toFixed(2)}px`
      }
    };

    expect(generateElementsStyles).toHaveReturnedWith(expectedElementsStyles);
  });
});

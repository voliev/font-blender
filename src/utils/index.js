import { ELEMENTS } from "../constants";

export const variantToStyle = variant => {
  const variantElements = variant
    .split(/(?!\d{3})(?=italic|normal)/gi)
    .reverse();
  const styles = variantElements.join(" ").replace("regular", "normal");
  return styles;
};

export const variantsToStyleOptions = variants =>
  variants.reduce(
    (options, variant) => {
      if (/^\d{3}$/gi.test(variant)) {
        variant = `${variant}normal`;
      }
      if (variant === "regular") {
        variant = "400normal";
      }
      if (variant === "italic") {
        variant = "400italic";
      }

      const values = variant.split(/(?!\d{3})(?=italic|normal)/gi);

      if (!options["font-weight"].includes(values[0])) {
        options["font-weight"].push(values[0]);
      }
      if (!options["font-style"].includes(values[1])) {
        options["font-style"].push(values[1]);
      }

      return options;
    },
    { "font-weight": [], "font-style": [] }
  );

export const cssPropertyToCamelCased = prop => {
  const elements = prop.split("-");

  const processedWords = elements.map((element, i) => {
    if (i === 0) return element;

    return element.replace(/\b\w{1}/, match => match.toUpperCase());
  });

  return processedWords.join("");
};

export const isPropTypeHexColor = (props, propName, componentName) => {
  if (!/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(props[propName])) {
    return new Error(
      "Invalid prop `" +
        propName +
        "` supplied to" +
        " `" +
        componentName +
        "`. Validation failed."
    );
  }
};

const generateOptions = selectedFonts =>
  Object.keys(selectedFonts).reduce((options, family) => {
    const { variants } = selectedFonts[family];
    options[family] = variantsToStyleOptions(variants);
    return options;
  }, {});

export const generateElementsStyles = (typeScale, textStyles, fonts) =>
  ELEMENTS.reduce((elementsStyles, element, idx, src) => {
    const { fontFamily } = textStyles[element];

    const exponent = element === "body" ? idx : src.length - idx - 2;

    elementsStyles[element] = generateElementStylesObject(
      element,
      textStyles,
      typeScale,
      fonts,
      fontFamily,
      exponent
    );

    return elementsStyles;
  }, {});

const generateElementStylesObject = (
  element,
  textStyles,
  typeScale,
  fonts,
  family,
  exponent
) => ({
  color: textStyles[element].color,
  fontFamily: fonts[family]
    ? `'${textStyles[element].fontFamily}', '${fonts[family].category}'`
    : family,
  fontSize: `${(
    Math.pow(typeScale.scale, exponent) * typeScale.fontSize
  ).toFixed(2)}px`,
  fontStyle: textStyles[element].fontStyle,
  fontWeight: textStyles[element].fontWeight
});

export const getPropertyOptions = (
  property,
  element,
  textStyles,
  selectedFonts
) => {
  if (property === "font-family") {
    return Object.keys(selectedFonts).sort((a, b) =>
      a.localeCompare(b, {}, { caseFirst: "upper" })
    );
  }

  const options = generateOptions(selectedFonts);
  const { fontFamily } = textStyles[element];

  return options[fontFamily] && options[fontFamily][property];
};

export const getPropertyValue = (textStyles, element, property) => {
  const camelCasedProp = cssPropertyToCamelCased(property);

  return textStyles[element][camelCasedProp];
};

const isSettingsPaneDisabled = state =>
  state.showcase.fontPreview.isVisible || state.showcase.styles.isVisible;

export const isControlDisabled = (state, ...rest) =>
  rest.reduce((acc, curr) => acc || !!curr, isSettingsPaneDisabled(state));

export const getDefaultVariant = variants => {
  // returns empty object for default value
  // of "font-family" property (sans-serif)
  if (!variants) {
    return {};
  }

  if (variants.includes("regular")) {
    return {
      style: "normal",
      weight: 400
    };
  } else if (variants.includes("italic")) {
    return {
      style: "italic",
      weight: 400
    };
  } else {
    return {
      style: variants[0].includes("italic") ? "italic" : "normal",
      weight: parseInt(variants[0])
    };
  }
};

export const numberInputChangeHandler = (
  inputValue,
  defaultValue,
  min,
  max,
  callback
) => {
  const maxDigits = max.toString().length;
  const value = inputValue === "" ? min : inputValue.slice(0, maxDigits);
  const parsedValue =
    value > max
      ? parseInt(value.slice(0, maxDigits - 1), 10)
      : parseInt(value, 10);

  if (isNaN(parsedValue)) {
    callback(defaultValue);
    return;
  }

  if (parsedValue >= min && parsedValue <= max) {
    callback(parsedValue);
    return;
  }

  callback(min);
};

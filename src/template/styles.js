import { ELEMENTS } from "../constants";

export default (styles, fonts) => {
  const { typeScale, textStyles } = styles;

  const variants = collectSelectedFontVariants(textStyles, ELEMENTS);
  const elementsValues = generateElementsValues(styles, fonts);

  const templateValues = [
    generateImportString(variants),
    generateRootElementTemplate(typeScale),
    generateElementsTemplate(elementsValues)
  ];

  return templateValues.reduce((template, value, idx, src) => {
    const newLine = idx !== src.length - 1 ? "\n\n" : "";
    return value ? template.concat(value, newLine) : template;
  }, "");
};

const generateImportString = variants => {
  if (Object.keys(variants).length === 0) {
    return "";
  }

  // Google Fonts API base URL
  const gFontsBaseUrl = "https://fonts.googleapis.com/css";

  // Generate query string according to Google Fonts API requirements
  // https://developers.google.com/fonts/docs/getting_started
  const query = Object.keys(variants).reduce(
    (queryStr, fontFamily, idx, src) => {
      const fontFamilyQueryStr = fontFamily.replace(/\s/gi, () => "+");
      const delimiter = idx !== src.length - 1 ? "|" : "";
      const fontVariantsSorted = variants[fontFamily].sort(
        (a, b) => parseInt(a, 10) - parseInt(b, 10)
      );

      return queryStr.concat(
        `${fontFamilyQueryStr}:${fontVariantsSorted.join(",")}${delimiter}`
      );
    },
    ""
  );

  return `@import url('${gFontsBaseUrl}?family=${query}');`;
};

const collectSelectedFontVariants = (styles, elements) =>
  elements.reduce((variants, element) => {
    const family = styles[element].fontFamily;

    if (family === "sans-serif") {
      return variants;
    }

    if (!variants[family]) {
      variants[family] = [];
    }

    const { fontStyle, fontWeight } = styles[element];

    const style = fontStyle === "normal" ? "" : "i";
    const variant = `${fontWeight}${style}`;

    if (!variants[family].includes(variant)) {
      variants[family].push(variant);
    }

    return variants;
  }, {});

const generateRootElementTemplate = typeScale =>
  `:root {
  --base-font-size: ${typeScale.fontSize}px;
  --scale-ratio: ${typeScale.scale};

  --font-xs:  calc(var(--base-font-size) / var(--scale-ratio));
  --font-sm:  var(--base-font-size);
  --font-md:  calc(var(--font-sm) * var(--scale-ratio));
  --font-lg:  calc(var(--font-md) * var(--scale-ratio));
  --font-xl:  calc(var(--font-lg) * var(--scale-ratio));
  --font-xxl: calc(var(--font-xl) * var(--scale-ratio));

  font-size: var(--font-sm);
}`;

const getElementFontSizeVariable = element => {
  const fontSizeVariableOptions = {
    h1: "--font-xxl",
    h2: "--font-xl",
    h3: "--font-lg",
    h4: "--font-md",
    small: "--font-xs"
  };

  return fontSizeVariableOptions[element];
};

const generateElementsValues = (styles, fonts) => {
  const { textStyles, background } = styles;

  const elementsValues = ELEMENTS.reduce((values, element) => {
    values[element] = "";

    const { fontFamily, fontStyle, fontWeight, color } = textStyles[element];

    // <body> background-color
    if (element === "body") {
      const { color: backgroundColor } = background;

      values[element] = values[element].concat(
        `  background-color: ${backgroundColor};\n`
      );
    }

    // color
    if (
      element === "body" ||
      (element !== "body" && color !== textStyles.body.color)
    ) {
      values[element] = values[element].concat(`  color: ${color};\n`);
    }

    // font-family
    if (
      element === "body" ||
      (element !== "body" && fontFamily !== textStyles.body.fontFamily)
    ) {
      const category = fonts[fontFamily]
        ? fonts[fontFamily].category
        : "sans-serif";

      const fontFamilyValue =
        fontFamily === category
          ? `'${category}'`
          : `'${fontFamily}', '${category}'`;

      values[element] = values[element].concat(
        `  font-family: ${fontFamilyValue};\n`
      );
    }

    // font-size
    if (element !== "body" && element !== "li") {
      const fontSizeValue = getElementFontSizeVariable(element);

      values[element] = values[element].concat(
        `  font-size: var(${fontSizeValue});\n`
      );
    }

    // font-style
    if (
      element === "body" ||
      (element !== "body" && fontStyle !== textStyles.body.fontStyle)
    ) {
      const fontStyleValue = fontStyle === "italic" ? fontStyle : "";

      values[element] = fontStyleValue
        ? values[element].concat(`  font-style: ${fontStyleValue};\n`)
        : values[element];
    }

    // font-weight
    if (
      element === "body" ||
      (element !== "body" && fontWeight !== textStyles.body.fontWeight)
    ) {
      values[element] = values[element].concat(
        `  font-weight: ${fontWeight};\n`
      );
    }

    // <body> line-height
    if (element === "body") {
      values[element] = values[element].concat(`  line-height: 1.5;\n`);
    }

    // <h1> margin-top
    if (element === "h1") {
      values[element] = values[element].concat(`  margin-top: 0;\n`);
    }

    // <p> margin-bottom
    if (element === "body") {
      values["p"] = "p {\n  margin-bottom: 1.25em;\n}";
    }

    // headers' margins
    if (element === "body") {
      values["headers"] =
        "h1, h2, h3, h4, h5 {\n  margin: 2.75rem 0 1rem;\n  line-height: 1.2;\n}";
    }

    // add selector and wrap styles into curly braces
    if (values[element]) {
      values[element] = `${element} {\n${values[element]}}`;
    }

    return values;
  }, {});

  return elementsValues;
};

const generateElementsTemplate = values =>
  Object.keys(values).reduce((template, element, idx, src) => {
    if (values[element]) {
      const newLine = idx === src.length - 1 ? "\n" : "\n\n";

      template = template.concat(`${values[element]}${newLine}`);
    }
    return template;
  }, "");

import generateCSSTemplate from "../../template/styles";
import fonts from "../../fixtures/fonts";
import styles from "../../fixtures/styles";
import typeScale from "../../fixtures/typeScale";
import textStyles, * as elements from "../../fixtures/textStyles";
import background from "../../fixtures/background";

const setup = () => jest.fn(generateCSSTemplate);

afterEach(() => {
  jest.clearAllMocks();
});

it("should return string", () => {
  const getCSS = setup();
  getCSS(styles, fonts);
  expect(getCSS).toHaveReturnedWith(expect.any(String));
});

it("should return string without @import rule", () => {
  const getCSS = setup();
  getCSS(styles, fonts);
  expect(getCSS).toHaveReturnedWith(expect.not.stringMatching("@import"));
});

it("should return string with @import rule", () => {
  const getCSS = setup();
  const updatedH1Styles = {
    ...elements.h1,
    fontFamily: "Roboto"
  };
  const updatedTextStyles = {
    ...textStyles,
    h1: {
      ...textStyles.h1,
      ...updatedH1Styles
    }
  };

  getCSS(
    {
      typeScale,
      textStyles: updatedTextStyles,
      background
    },
    fonts
  );

  expect(getCSS).toHaveReturnedWith(
    expect.stringContaining(
      "@import url('https://fonts.googleapis.com/css?family=Roboto:400');"
    )
  );
});

it("should return string with @import rule", () => {
  const getCSS = setup();
  const updatedH1Styles = {
    ...elements.h1,
    fontFamily: "Roboto",
    fontStyle: "italic",
    fontWeight: 500
  };
  const updatedH2Styles = {
    ...elements.h2,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 700
  };
  const updatedTextStyles = {
    ...textStyles,
    h1: {
      ...textStyles.h1,
      ...updatedH1Styles
    },
    h2: {
      ...textStyles.h2,
      ...updatedH2Styles
    }
  };

  getCSS(
    {
      typeScale,
      textStyles: updatedTextStyles,
      background
    },
    fonts
  );

  expect(getCSS).toHaveReturnedWith(
    expect.stringContaining(
      "@import url('https://fonts.googleapis.com/css?family=Roboto:500i,700');"
    )
  );
});

it("should return string with @import rule", () => {
  const getCSS = setup();
  const updatedH1Styles = {
    ...elements.h1,
    fontFamily: "Roboto",
    fontStyle: "italic",
    fontWeight: 500
  };
  const updatedH2Styles = {
    ...elements.h2,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 700
  };
  const updatedH3Styles = {
    ...elements.h3,
    fontFamily: "Lato",
    fontStyle: "italic",
    fontWeight: 300
  };
  const updatedH4Styles = {
    ...elements.h4,
    fontFamily: "Lato",
    fontStyle: "italic",
    fontWeight: 300
  };
  const updatedTextStyles = {
    ...textStyles,
    h1: {
      ...textStyles.h1,
      ...updatedH1Styles
    },
    h2: {
      ...textStyles.h2,
      ...updatedH2Styles
    },
    h3: {
      ...textStyles.h3,
      ...updatedH3Styles
    },
    h4: {
      ...textStyles.h4,
      ...updatedH4Styles
    }
  };

  getCSS(
    {
      typeScale,
      textStyles: updatedTextStyles,
      background
    },
    fonts
  );

  expect(getCSS).toHaveReturnedWith(
    expect.stringContaining(
      "@import url('https://fonts.googleapis.com/css?family=Roboto:500i,700|Lato:300i');"
    )
  );
});

it("should return string with styles for root element", () => {
  const getCSS = setup();
  const rootStyles = [
    ":root {",
    "  --base-font-size: 16px;",
    "  --scale-ratio: 1.414;",
    "",
    "  --font-xs:  calc(var(--base-font-size) / var(--scale-ratio));",
    "  --font-sm:  var(--base-font-size);",
    "  --font-md:  calc(var(--font-sm) * var(--scale-ratio));",
    "  --font-lg:  calc(var(--font-md) * var(--scale-ratio));",
    "  --font-xl:  calc(var(--font-lg) * var(--scale-ratio));",
    "  --font-xxl: calc(var(--font-xl) * var(--scale-ratio));",
    "",
    "  font-size: var(--font-sm);",
    "}"
  ];

  getCSS(styles, fonts);

  expect(getCSS).toHaveReturnedWith(
    expect.stringContaining(rootStyles.join("\n"))
  );
});

it("should return string with <body> element styles", () => {
  const getCSS = setup();
  const updatedH1Styles = {
    ...elements.body,
    fontFamily: "Roboto"
  };
  const updatedTextStyles = {
    ...textStyles,
    body: {
      ...textStyles.body,
      ...updatedH1Styles
    }
  };
  const bodyStyles = [
    "body {",
    "  background-color: #fff;",
    "  color: #333;",
    "  font-family: 'Roboto', 'sans-serif';",
    "  font-weight: 400;",
    "  line-height: 1.5;",
    "}"
  ];

  getCSS(
    {
      typeScale,
      textStyles: updatedTextStyles,
      background
    },
    fonts
  );

  expect(getCSS).toHaveReturnedWith(
    expect.stringContaining(bodyStyles.join("\n"))
  );
});

it("should return string with <p> element styles", () => {
  const getCSS = setup();
  const paragraphStyles = ["p {", "  margin-bottom: 1.25em;", "}"];

  getCSS(styles, fonts);

  expect(getCSS).toHaveReturnedWith(
    expect.stringContaining(paragraphStyles.join("\n"))
  );
});

it("shoud return stirng witn headers' styles", () => {
  const getCSS = setup();
  const headersStyles = [
    "h1, h2, h3, h4, h5 {",
    "  margin: 2.75rem 0 1rem;",
    "  line-height: 1.2;",
    "}"
  ];

  getCSS(styles, fonts);

  expect(getCSS).toHaveReturnedWith(
    expect.stringContaining(headersStyles.join("\n"))
  );
});

it("should return string with <h1> element styles", () => {
  const getCSS = setup();
  const h1Styles = [
    "h1 {",
    "  font-family: 'Roboto', 'sans-serif';",
    "  font-size: var(--font-xxl);",
    "  margin-top: 0;",
    "}"
  ];

  const updatedH1Styles = {
    ...elements.h1,
    fontFamily: "Roboto"
  };
  const updatedTextStyles = {
    ...textStyles,
    h1: {
      ...textStyles.h1,
      ...updatedH1Styles
    }
  };

  getCSS(
    {
      typeScale,
      textStyles: updatedTextStyles,
      background
    },
    fonts
  );

  expect(getCSS).toHaveReturnedWith(
    expect.stringContaining(h1Styles.join("\n"))
  );
});

it("should return string with <h2>, <h3> and <h4> element styles", () => {
  const getCSS = setup();
  const h2toh4Styles = [
    "h2 {",
    "  font-size: var(--font-xl);",
    "}",
    "",
    "h3 {",
    "  font-size: var(--font-lg);",
    "}",
    "",
    "h4 {",
    "  font-size: var(--font-md);",
    "}"
  ];

  getCSS(styles, fonts);

  expect(getCSS).toHaveReturnedWith(
    expect.stringContaining(h2toh4Styles.join("\n"))
  );
});

it("should return string with <li> element styles", () => {
  const getCSS = setup();
  const liStyles = [
    "li {",
    "  font-family: 'Roboto', 'sans-serif';",
    "  font-weight: 300;",
    "}"
  ];

  const updatedLiStyles = {
    ...elements.li,
    fontFamily: "Roboto",
    fontWeight: 300
  };
  const updatedTextStyles = {
    ...textStyles,
    li: {
      ...textStyles.li,
      ...updatedLiStyles
    }
  };

  getCSS(
    {
      typeScale,
      textStyles: updatedTextStyles,
      background
    },
    fonts
  );

  expect(getCSS).toHaveReturnedWith(
    expect.stringContaining(liStyles.join("\n"))
  );
});

it("should return string with <small> element styles", () => {
  const getCSS = setup();
  const smallStyles = ["small {", "  font-size: var(--font-xs);", "}"];

  getCSS(styles, fonts);

  expect(getCSS).toHaveReturnedWith(
    expect.stringContaining(smallStyles.join("\n"))
  );
});

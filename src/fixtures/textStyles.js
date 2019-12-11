const defaultStyles = {
  fontFamily: "sans-serif",
  fontStyle: "normal",
  fontWeight: 400,
  color: "#333"
};

export const body = {
  ...defaultStyles
};

export const h1 = {
  ...defaultStyles,
  inheritStyles: true
};

export const h2 = {
  ...defaultStyles,
  inheritStyles: true
};

export const h3 = {
  ...defaultStyles,
  inheritStyles: true
};

export const h4 = {
  ...defaultStyles,
  inheritStyles: true
};

export const li = {
  ...defaultStyles,
  inheritStyles: true
};

export const small = {
  ...defaultStyles,
  inheritStyles: true
};

export default {
  body,
  h1,
  h2,
  h3,
  h4,
  li,
  small
};

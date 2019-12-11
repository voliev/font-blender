import { SET_STYLES_INHERITANCE, UPDATE_ELEMENT_STYLES } from "../constants";

export const setStylesInheritance = element => ({
  type: SET_STYLES_INHERITANCE,
  element
});

export const updateElementStyles = (element, property, value) => ({
  type: UPDATE_ELEMENT_STYLES,
  element,
  property,
  value
});

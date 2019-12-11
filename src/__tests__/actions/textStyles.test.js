import {
  setStylesInheritance,
  updateElementStyles
} from "../../actions/textStyles";
import { SET_STYLES_INHERITANCE, UPDATE_ELEMENT_STYLES } from "../../constants";

it("should generate styles inheritance action object", () => {
  const element = "h2";
  const action = setStylesInheritance("h2");

  expect(action).toEqual({
    type: SET_STYLES_INHERITANCE,
    element
  });
});

it("should generate styles update action object", () => {
  const element = "h3";
  const property = "font-weight";
  const value = 300;
  const action = updateElementStyles(element, property, value);

  expect(action).toEqual({
    type: UPDATE_ELEMENT_STYLES,
    element,
    property,
    value
  });
});

import { cssPropertyToCamelCased, getDefaultVariant } from "../utils";
import {
  ELEMENTS,
  SET_DEFAULT_STATE,
  SET_STYLES_INHERITANCE,
  UPDATE_ELEMENT_STYLES
} from "../constants";

const initialState = {
  inheritStyles: true,
  fontFamily: "sans-serif",
  fontStyle: "normal",
  fontWeight: 400,
  color: "#333"
};

const textStylesReducerDefaultState = ELEMENTS.reduce((res, element) => {
  if (element !== "body") {
    res[element] = { ...initialState };
  } else {
    res[element] = {
      fontFamily: "sans-serif",
      fontStyle: "normal",
      fontWeight: 400,
      color: "#333"
    };
  }
  return res;
}, {});

export default (state = textStylesReducerDefaultState, action) => {
  switch (action.type) {
    case SET_STYLES_INHERITANCE:
      const updates = !state[action.element].inheritStyles ? state.body : {};
      return {
        ...state,
        [action.element]: {
          ...state[action.element],
          inheritStyles: !state[action.element].inheritStyles,
          ...updates
        }
      };
    case UPDATE_ELEMENT_STYLES:
      return ELEMENTS.reduce(
        (updatedState, element) => {
          if (element === action.element) {
            let updates;

            const property = cssPropertyToCamelCased(action.property);

            if (property === "fontFamily") {
              const { value: font } = action;
              const variant = getDefaultVariant(font.variants);

              updates = {
                fontFamily: font.family || initialState.fontFamily,
                fontStyle: variant.style || initialState.fontStyle,
                fontWeight: variant.weight || initialState.fontWeight
              };
            } else {
              updates = {
                [property]: action.value
              };
            }

            updatedState[element] = {
              ...updatedState[element],
              ...updates
            };
          }

          if (updatedState[element].inheritStyles) {
            updatedState[element] = {
              ...updatedState[element],
              ...updatedState.body
            };
          }

          return updatedState;
        },
        { ...state }
      );
    case SET_DEFAULT_STATE:
      return textStylesReducerDefaultState;
    default:
      return state;
  }
};

export const getTextStyles = state => state.styles.present.textStyles;
export const getTextStylesDefaultState = () => ({
  ...textStylesReducerDefaultState
});

import fonts from "./fonts";
import filters from "./filters";
import selectedFonts from "./selectedFonts";
import * as showcase from "./showcase";
import styles from "./styles";
import notifications from "./notifications";

const state = {
  fonts: { all: fonts, fontsDataStatus: "" },
  filters,
  selectedFonts: { present: [...selectedFonts] }, // undoable
  showcase: { ...showcase.initialShowcaseState },
  styles: { present: { ...styles } }, // undoable
  notifications
};

export default { ...state };

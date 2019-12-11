import { connect } from "react-redux";
import {
  startRemoveFontFromSelected,
  startClearSelectedFonts
} from "../../actions/selectedFonts";
import { getSelectedFontFamilies } from "../../reducers/selectedFonts";
import SelectedFonts from "./SelectedFonts";

const mapStateToProps = state => ({
  selectedFonts: getSelectedFontFamilies(state)
});

const mapDispatchToProps = dispatch => ({
  removeFontFromSelected: family =>
    dispatch(startRemoveFontFromSelected(family)),
  clearSelectedFonts: () => dispatch(startClearSelectedFonts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedFonts);

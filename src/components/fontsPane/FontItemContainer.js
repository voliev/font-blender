import { connect } from "react-redux";
import { startFetchFont } from "../../actions/fonts";
import {
  startAddFontToSelected,
  startRemoveFontFromSelected
} from "../../actions/selectedFonts";
import { startDisplayShowcaseFontPreview } from "../../actions/showcase";
import { isSelected } from "../../reducers/selectedFonts";
import FontItem from "./FontItem";

const mapStateToProps = (state, { font, isVisible }) => ({
  font,
  isVisible,
  selected: isSelected(state, font.family),
  previewFontFamily: state.showcase.fontPreview.family
});

const mapDispatchToProps = dispatch => ({
  fetchFont: (family, charRange = undefined) =>
    dispatch(startFetchFont(family, charRange)),
  addFontToSelected: family => dispatch(startAddFontToSelected(family)),
  removeFontFromSelected: family =>
    dispatch(startRemoveFontFromSelected(family)),
  startDisplayShowcaseFontPreview: family =>
    dispatch(startDisplayShowcaseFontPreview(family))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FontItem);

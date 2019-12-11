import { connect } from "react-redux";
import { setTypeScale, setFontSize } from "../../actions/typeScale";
import { getTypeScale } from "../../reducers/typeScale";
import { isControlDisabled } from "../../utils";
import TypeScale from "./TypeScale";

const mapStateToProps = state => ({
  typeScale: getTypeScale(state),
  disabled: isControlDisabled(state)
});

const mapDispatchToProps = dispatch => ({
  setFontSize: fontSize => dispatch(setFontSize(fontSize)),
  setTypeScale: scale => dispatch(setTypeScale(scale))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TypeScale);

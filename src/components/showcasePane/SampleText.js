import { connect } from "react-redux";
import { getTypeScale } from "../../reducers/typeScale";
import { getTextStyles } from "../../reducers/textStyles";
import { getBackground } from "../../reducers/background";
import { getFonts } from "../../reducers/fonts";
import { generateElementsStyles } from "../../utils";
import Text from "./Text";

const mapStateToProps = state => {
  const typeScale = getTypeScale(state);
  const textStyles = getTextStyles(state);
  const fonts = getFonts(state);

  return {
    background: getBackground(state),
    elementsStyles: generateElementsStyles(typeScale, textStyles, fonts)
  };
};

export default connect(mapStateToProps)(Text);

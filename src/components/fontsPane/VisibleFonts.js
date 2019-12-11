import React, { Component } from "react";
import classNames from "classnames";
import VisibilitySensor from "react-visibility-sensor";
import PropTypes from "prop-types";
import FontItemContainer from "./FontItemContainer";
import "./styles/VisibleFonts.css";

class VisibleFonts extends Component {
  constructor() {
    super();

    this.state = {
      containment: ""
    };

    this.listRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      containment: this.listRef.current
    });
  }

  render() {
    const { containment } = this.state;
    const { visibleFonts, adjustBundleSize } = this.props;

    const componentClasses = classNames({
      VisibleFonts: true,
      empty: visibleFonts.length === 0
    });

    return (
      <ul className={componentClasses} ref={this.listRef}>
        {visibleFonts.length > 0 && containment !== "" ? (
          visibleFonts.map((font, idx, src) =>
            !font.requested || idx === src.length - 1 ? (
              <VisibilitySensor
                containment={containment}
                key={font.family}
                onChange={idx === src.length - 1 ? adjustBundleSize : null}
                partialVisibility={true}
                intervalDelay={200}
                scrollCheck={true}
                scrollDelay={1000}
              >
                {({ isVisible }) => (
                  <FontItemContainer font={font} isVisible={isVisible} />
                )}
              </VisibilitySensor>
            ) : (
              <FontItemContainer font={font} key={font.family} />
            )
          )
        ) : (
          <li className="no-matches">No matches found...</li>
        )}
      </ul>
    );
  }
}

VisibleFonts.propTypes = {
  adjustBundleSize: PropTypes.func.isRequired,
  visibleFonts: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

export default VisibleFonts;

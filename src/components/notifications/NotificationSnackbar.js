import React, { PureComponent } from "react";
import classNames from "classnames";
import ClearOutlined from "@material-ui/icons/ClearOutlined";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TIMEOUT } from "../../constants";
import UndoButton from "./UndoButton";
import "./styles/NotificationSnackbar.css";

export class NotificationSnackbar extends PureComponent {
  constructor() {
    super();

    this.state = {
      stage: "elevate",
      timerId: undefined
    };
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
    this.handleUndoButtonClick = this.handleUndoButtonClick.bind(this);
    this.handleCloseIconClick = this.handleCloseIconClick.bind(this);
  }

  handleAnimationEnd() {
    const { group, removeNotification, undoActionHandler } = this.props;

    const handlers = {
      elevate: () => this.setTimer(),
      drop: removeNotification,
      undo: undoActionHandler
    };
    const { stage } = this.state;

    if (this.state.stage === "drop") {
      handlers[stage](group);
    } else {
      handlers[stage]();
    }
  }

  handleUndoButtonClick() {
    this.clearTimer("undo");
  }

  handleCloseIconClick() {
    this.clearTimer("drop");
  }

  setTimer() {
    const timerId = setTimeout(() => {
      this.clearTimer("drop");
    }, TIMEOUT);

    this.setState({
      stage: "display",
      timerId
    });
  }

  clearTimer(stage) {
    clearTimeout(this.state.timerId);

    this.setState({
      stage,
      timerId: undefined
    });
  }

  componentDidUpdate(prevProps) {
    const { stage } = this.state;
    const { pending } = this.props.notification;
    if (stage === "display" && pending) {
      this.clearTimer("drop");
    }

    // Group's state change triggers notification stage change
    if (this.props.groupState) {
      const { groupState } = this.props;
      const { groupState: prevGroupState } = prevProps;
      const isStateWentForward = groupState.length > prevGroupState.length;
      if (isStateWentForward && this.state.stage === "display") {
        this.clearTimer("drop");
      }
    }
  }

  render() {
    const { current: notification } = this.props.notification;
    const { stage } = this.state;
    const componentClasses = classNames({
      NotificationSnackbar: true,
      [stage]: true
    });

    return (
      <div
        className={componentClasses}
        onAnimationEnd={this.handleAnimationEnd}
      >
        <p className="notification">{notification}</p>
        <div className="controls">
          {this.props.undoActionHandler ? (
            <UndoButton onClickHandler={this.handleUndoButtonClick} />
          ) : null}
          <button
            className="btn btn-round-small close-icon"
            onClick={this.handleCloseIconClick}
            title="Close"
            value="close"
          >
            <ClearOutlined fontSize="small" />
          </button>
        </div>
      </div>
    );
  }
}

NotificationSnackbar.propTypes = {
  notification: PropTypes.exact({
    current: PropTypes.string.isRequired,
    pending: PropTypes.string.isRequired
  }).isRequired,
  group: PropTypes.string.isRequired,
  removeNotification: PropTypes.func.isRequired,
  undoActionHandler: PropTypes.func,
  groupState: PropTypes.any
};

const mapStateToProps = (state, ownProps) => ({
  groupState:
    state[ownProps.group] && "present" in state[ownProps.group]
      ? state[ownProps.group].present
      : undefined
});

export default connect(mapStateToProps)(NotificationSnackbar);

import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import NotificationSnackbar from "./NotificationSnackbar";
import { startUndoDeselected } from "../../actions/selectedFonts";
import { startUndoReset } from "../../actions/styles";
import { removeNotification } from "../../actions/notifications";
import "./styles/Notifications.css";

export const Notifications = ({
  notifications,
  removeNotification,
  ...rest
}) => {
  return (
    <div className="Notifications">
      {Object.keys(notifications).map(group =>
        notifications[group].current ? (
          <NotificationSnackbar
            key={notifications[group].current}
            group={group}
            notification={notifications[group]}
            undoActionHandler={rest[group]}
            removeNotification={removeNotification}
          />
        ) : null
      )}
    </div>
  );
};

Notifications.propTypes = {
  notifications: PropTypes.objectOf(
    PropTypes.exact({
      current: PropTypes.string.isRequired,
      pending: PropTypes.string.isRequired
    })
  ).isRequired,
  removeNotification: PropTypes.func.isRequired,
  selectedFonts: PropTypes.func.isRequired,
  styles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  notifications: state.notifications
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      selectedFonts: startUndoDeselected,
      styles: startUndoReset,
      removeNotification
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);

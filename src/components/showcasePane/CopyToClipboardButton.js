import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Clipboard from "clipboard";
import Copy from "@material-ui/icons/FileCopyOutlined";
import { addNotification } from "../../actions/notifications";
import "./styles/CopyToClipboardButton.css";

export class CopyToClipboardButton extends Component {
  clipboard = null;

  constructor() {
    super();

    this.handleCopySuccess = this.handleCopySuccess.bind(this);
    this.handleCopyError = this.handleCopyError.bind(this);
  }

  handleCopySuccess(e) {
    e.clearSelection();

    if (!this.props.notificationActive) {
      this.props.addNotification("Copied to clipboard");
    }
  }

  handleCopyError() {
    if (!this.props.notificationActive) {
      this.props.addNotification("Unable to copy to clipboard");
    }
  }

  componentDidMount() {
    this.clipboard = new Clipboard(".CopyToClipboardButton");
    this.clipboard.on("success", this.handleCopySuccess);
    this.clipboard.on("error", this.handleCopyError);
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  render() {
    return (
      <button
        className="CopyToClipboardButton btn-blue-rect"
        data-clipboard-target={`#${this.props.target}`}
        disabled={false}
        title="Copy to clipboard"
        value="copy"
      >
        <span className="icon">
          <Copy fontSize="small" />
        </span>
        Copy to clipboard
      </button>
    );
  }
}

CopyToClipboardButton.propTypes = {
  notificationActive: PropTypes.bool.isRequired,
  target: PropTypes.string.isRequired,
  addNotification: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  notificationActive: !!state.notifications["clipboard"].current
});

const mapDispatchToProps = dispatch => ({
  addNotification: text => dispatch(addNotification(text, "clipboard"))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CopyToClipboardButton);

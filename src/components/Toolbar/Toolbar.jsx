import React from "react";
import PropTypes from "prop-types";
import ClipboardManager from "../ClipboardManager";
import ColorPicker from "./ColorPicker";
import Tooltip from "../Tooltip/Tooltip";
import "./styles.css";

class Toolbar extends React.Component {
  static propTypes = {
    addNote: PropTypes.func
  };

  render() {
    return (
      <div
        className="Toolbar"
        role="toolbar"
        aria-label="Add notes and select color"
      >
        <ColorPicker />
        <button
          type="button"
          aria-label="Add note"
          onClick={this.props.addNote}
          style={{ dispay: "inline-block" }}
        >
          +
        </button>
        {/* Tooltip needs to be a component */}
        <Tooltip text="Add note" />
        <ClipboardManager />
      </div>
    );
  }
}

export default Toolbar;

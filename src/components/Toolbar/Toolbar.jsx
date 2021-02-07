import React from "react";
import PropTypes from "prop-types";
import ClipboardManager from "../ClipboardManager";
import ColorPicker from "./ColorPicker";
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
        >
          +
        </button>
        <ClipboardManager />
      </div>
    );
  }
}

export default Toolbar;

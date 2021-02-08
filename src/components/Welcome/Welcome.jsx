import React from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import logo from "./logo.svg";
import "./styles.css";

class Welcome extends React.Component {
  static propTypes = {
    announcement: PropTypes.string
  };

  render() {
    const { notes } = this.props;

    if (!isEmpty(notes)) return null;

    return (
      <div className="Welcome">
        {/* Needs styles */}
        <h1>Mini Mural</h1>
        {/* Removing alternative text - add notes on it */}
        <img src={logo} className="logo" alt="" />
        <div className="instructions">
          <h2 id="instructions">Instructions</h2>
          <p>
            Add Note: <span className="key">Double Click</span> or press the{" "}
            <span className="key">+</span> button
          </p>
          <p>
            Edit Note: <span className="key">Click</span> or{" "}
            <span className="key">Enter</span>
          </p>
          <p>
            Stop Editing Note: <span className="key">Escape</span>
          </p>
          <p>
            Delete Note: <span className="key">Delete</span>
          </p>
          <p>
            Multiple Selection: <span className="key">Shift</span> +{" "}
            <span className="key">V</span>
          </p>
          <p>
            Copy Notes: <span className="key">Ctrl</span> +{" "}
            <span className="key">C</span>
          </p>
          <p>
            Paste Notes: <span className="key">Ctrl</span> +{" "}
            <span className="key">V</span>
          </p>
        </div>
      </div>
    );
  }
}

export default Welcome;

import React from "react";
import PropTypes from "prop-types";
import Toolbar from "../Toolbar";
import StickyNote from "../StickyNote";

import { NOTE_DEFAULT_HEIGHT, NOTE_DEFAULT_WIDTH } from "../../constants";
import { pixelsToInt } from "../../utils";
import "./styles.css";
import Welcome from "../Welcome";

class Mural extends React.Component {
  static propTypes = {
    notes: PropTypes.object,
    selectedNotes: PropTypes.object,
    currentColor: PropTypes.string,
    addNote: PropTypes.func,
    enableMultipleSelection: PropTypes.func,
    disableMultipleSelection: PropTypes.func,
    clearSelectedNotes: PropTypes.func,
    editNote: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.mural = React.createRef();
    this.button = React.createRef();
  }

  componentDidMount() {
    this.mural.current.addEventListener("click", this.clearSelectedNotes);
    this.mural.current.addEventListener("dblclick", this.addNoteToMural);
    this.mural.current.addEventListener("keydown", this.handleKeyDown);
    this.mural.current.addEventListener("keyup", this.handleKeyUp);
    this.button.current.addEventListener(
      "click",
      this.addNoteToMuralKeyboardFriendly
    );
  }

  clearSelectedNotes = e => {
    if (e.target.isEqualNode(this.mural.current)) {
      this.props.clearSelectedNotes();
    }
  };

  clearSelectedNotesKeyboardFriendly = e => {
    this.props.clearSelectedNotes();
  };

  addNoteToMural = e => {
    if (e.target.classList.contains("sticky-note-content")) {
      return;
    }

    const { x, y } = e;
    const { currentColor, addNote } = this.props;
    const width = NOTE_DEFAULT_HEIGHT;
    const height = NOTE_DEFAULT_WIDTH;

    const noteToAdd = {
      text: "",
      color: currentColor,
      width,
      height,
      x: x - pixelsToInt(width) / 2,
      y: y - pixelsToInt(height) / 2
    };

    addNote(noteToAdd);
  };

  addNoteToMuralKeyboardFriendly = e => {
    e.stopImmediatePropagation();
    if (e.target.classList.contains("sticky-note-content")) {
      return;
    }

    const { notes } = this.props;

    const counter = Object.keys(notes).length + 1;

    const { currentColor, addNote } = this.props;

    const width = NOTE_DEFAULT_HEIGHT;
    const height = NOTE_DEFAULT_WIDTH;

    const noteToAdd = {
      text: "",
      color: currentColor,
      width,
      height,
      x: counter * (pixelsToInt(width) + 10),
      y: 0
    };

    addNote(noteToAdd);
    console.log(StickyNote);
  };

  handleKeyDown = e => {
    if (e.key === "Shift") {
      this.props.enableMultipleSelection();
    }
  };

  handleKeyUp = e => {
    if (e.key === "Shift") {
      this.props.disableMultipleSelection();
    }
  };

  render() {
    const { notes, selectedNotes } = this.props;
    const StickyNotes = Object.values(notes).map(
      ({ id, text, color, width, height, x, y }) => {
        const selected = selectedNotes.hasOwnProperty(id);

        return (
          <StickyNote
            id={id}
            text={text}
            color={color}
            width={width}
            height={height}
            x={x}
            y={y}
            selected={selected}
            key={id}
          />
        );
      }
    );

    return (
      <div id="Mural" className="Mural" ref={this.mural} tabIndex="-1">
        <button type="button" ref={this.button}>
          Add note blah blah blah, el boton mas largo que viste en tu vida
        </button>
        <Welcome />
        {StickyNotes}
        <Toolbar />
      </div>
    );
  }
}

export default Mural;

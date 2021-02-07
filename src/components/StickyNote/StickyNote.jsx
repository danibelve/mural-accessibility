import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Color from "color";
import FontAwesomeButton from "../FontAwesomeButton";
import "./styles.css";
class StickyNote extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    index: PropTypes.number,
    selected: PropTypes.bool,
    setSelectedNote: PropTypes.func,
    pushSelectedNote: PropTypes.func,
    updateNote: PropTypes.func,
    deleteNote: PropTypes.func
  };

  static defaultProps = {
    text: "",
    color: "#b1d6d0",
    height: "100px",
    width: "100px",
    x: "0",
    y: "0",
    hasContent: false,
    selected: false
  };

  constructor(props) {
    super(props);
    this.textarea = React.createRef();
    this.note = React.createRef();
    this.state = { editMode: false, hasContent: false };
  }

  componentDidMount() {
    console.log("entre");
    this.textarea.current.addEventListener("click", this.selectNote);
    this.textarea.current.addEventListener("dblclick", this.editNote);
    this.textarea.current.addEventListener(
      "keydown",
      this.stopEditingKeyboardFriendly
    );
    this.note.current.addEventListener(
      "keydown",
      this.editNoteKeyboardFriendly
    );
    this.note.current.addEventListener("keydown", this.catchDelete);
    this.note.current.addEventListener(
      "keyup",
      this.handleFocusKeyboardFriendly
    );
    document.querySelector(
      '[role="alert"]'
    ).innerHTML = this.props.announcement;
  }

  catchDelete = e => {
    const enter = e.key === "Enter";
    const deleteKey = e.key === "Backspace";

    if (enter && e.srcElement === this.note.current) {
      e.preventDefault();
    } else if (deleteKey) {
      this.handleDelete();
    }
  };

  selectNote = e => {
    const {
      id,
      setSelectedNote,
      pushSelectedNote,
      multipleSelection
    } = this.props;

    if (multipleSelection) {
      pushSelectedNote(id);
    } else {
      setSelectedNote(id);
    }
  };

  editNote = () => {
    this.setState({ editMode: true });
    this.textarea.current.focus();
  };

  editNoteKeyboardFriendly = e => {
    /* use code instead of key and make it global constansts */
    const enter = e.key === "Enter";
    const tab = e.shiftKey && e.key === "Tab";

    // e.stopPropagation not working??
    if (enter && e.srcElement === this.note.current) {
      e.preventDefault();
      this.setState({ editMode: true });
      this.textarea.current.focus();
    } else if (tab) {
      const { clearSelectedNotesKeyboardFriendly } = this.props;
      clearSelectedNotesKeyboardFriendly;
      this.note.current.focus();
    }
    this.checkContentToAddStickyNoteDescription();
  };

  checkContentToAddStickyNoteDescription() {
    const note = document.getElementById("sticky-note-content").innerHTML;
    // must refactor
    if (note === null || note === "") {
      this.setState({ hasContent: false });
    } else {
      this.setState({ hasContent: true });
    }
  }

  stopEditingKeyboardFriendly = e => {
    const escape = e.key === "Escape";

    if (escape) {
      e.preventDefault();
      this.setState({ editMode: false });
      this.selectNote();
    }
    this.checkContentToAddStickyNoteDescription();
  };

  handleFocusKeyboardFriendly = e => {
    const tab = e.key === "Tab";

    if (tab) {
      e.preventDefault();
      if (!e.shiftKey) {
        this.selectNote();
      }
    }
  };

  handleDelete = e => {
    const { id, deleteNote } = this.props;
    deleteNote(id);
  };

  handleOnBlur = e => {
    const text = this.props.text;
    const updatedText = e.target.textContent;

    if (text !== updatedText) {
      const { id, color, height, width, x, y, selected } = this.props;
      const updatedNote = {
        id,
        text: updatedText,
        color,
        height,
        width,
        x,
        y,
        selected
      };
      this.props.updateNote(updatedNote);
    }

    this.setState({ editMode: false });
  };

  render() {
    const { editMode } = this.state;
    const {
      id,
      text,
      color,
      height,
      width,
      x,
      y,
      selected,
      index,
      announcement
    } = this.props;

    const StickyNoteClassnames = classnames("StickyNote", {
      selected: selected,
      "edit-mode": editMode
    });

    const textColor = Color(color)
      .darken(0.4)
      .desaturate(0.3);
    const boxShadowColor = Color(color).darken(0.1);

    return (
      <div
        aria-label={`Sticky note ` + index}
        aria-describedby={this.state.hasContent ? "sticky-note-content" : false}
        className={StickyNoteClassnames}
        style={{
          width,
          height,
          transform: `translate(${x}px,${y}px)`,
          zIndex: selected ? "999999" : 1
        }}
        tabIndex="0"
        ref={this.note}
      >
        <p
          role="alert"
          className="sr-only"
          data-announcement={announcement}
        ></p>
        <div
          className="container"
          style={{
            background: color,
            boxShadow: `0px 0px 2px ${boxShadowColor}`,
            padding: selected ? "6px" : "8px"
          }}
          id={id}
          data-type="sticky-note"
        >
          <p
            id="sticky-note-content"
            className="sticky-note-content"
            contentEditable={editMode}
            onBlur={this.handleOnBlur}
            ref={this.textarea}
            style={{ color: textColor, userSelect: editMode ? "text" : "none" }}
            suppressContentEditableWarning="true"
          >
            {text}
          </p>
        </div>
        {selected && (
          <FontAwesomeButton
            faClass={"fa fa-trash-o"}
            handleOnClick={e => this.handleDelete(e)}
          />
        )}
      </div>
    );
  }
}

export default StickyNote;

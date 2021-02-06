import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

class FontAwesomeButton extends React.Component {
  static propTypes = {
    faClass: PropTypes.string.isRequired,
    handleOnClick: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.deleteButton = React.createRef();
  }

  componentDidMount() {
    const { handleOnClick } = this.props;

    this.deleteButton.current.addEventListener("click", handleOnClick);
  }

  render() {
    const { faClass } = this.props;
    return (
      <button
        type="button"
        className="icon"
        aria-label="Delete Note"
        ref={this.deleteButton}
      >
        <i className={faClass} aria-hidden="true" />
      </button>
    );
  }
}

export default FontAwesomeButton;

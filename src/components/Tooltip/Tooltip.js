import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

class Mural extends React.Component {
  static propTypes = {
    text: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { text } = this.props;
    return <div role="tooltip">{text}</div>;
  }
}

export default Mural;

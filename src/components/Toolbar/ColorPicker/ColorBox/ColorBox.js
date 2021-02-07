import React from "react";
import PropTypes from "prop-types";
import Color from "color";
import classnames from "classnames";
import "./styles.css";
import Tooltip from "../../../Tooltip/Tooltip";

class ColorBox extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    focus: PropTypes.func,
    color: PropTypes.string.isRequired
  };

  handleClick = e => {
    const color = e.target.dataset.color;
    this.props.onClick(color);
  };

  /* prevents element to lose focus */
  componentDidMount() {
    document.querySelector('div[aria-checked="true"]').focus();
  }

  onKeyPress = e => {
    const enter = e.key === "Enter";
    if (enter) {
      e.preventDefault();
      const color = e.target.dataset.color;
      this.props.onClick(color);
    }
  };

  getBorderStyle = () => {
    const { color, active } = this.props;
    let border;

    if (active) {
      const borderColor = Color(color)
        .darken(0.4)
        .desaturate(0.2);
      border = `2px solid ${borderColor}`;
    } else {
      border = "2px solid #4F5A65";
    }

    return border;
  };

  render() {
    const { color, active, name } = this.props;
    const className = classnames("colorBox", { activeBox: active });

    return (
      <React.Fragment>
        <div
          role="radio"
          tabIndex="0"
          aria-checked={active}
          aria-label={name}
          value={color}
          className={className}
          onClick={this.handleClick}
          onKeyPress={this.onKeyPress}
          data-color={color}
          style={{ background: color, border: this.getBorderStyle() }}
        />
        <Tooltip text={name} />
      </React.Fragment>
    );
  }
}

export default ColorBox;

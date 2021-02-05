import React from "react";
import PropTypes from "prop-types";
import { uniqueId } from "lodash";
import ColorBox from "./ColorBox";
import { COLOR_PICKER_DEFAULT } from "../../../constants";
import "./styles.css";

class ColorPicker extends React.Component {
  static propTypes = {
    setColor: PropTypes.func
  };

  pickColor = color => {
    this.props.setColor(color);
  };

  render() {
    const { currentColor } = this.props;
    const colorBoxes = COLOR_PICKER_DEFAULT.map(color => (
      <ColorBox
        color={color.hexa}
        onClick={this.pickColor}
        name={color.name}
        active={currentColor === color.hexa}
        key={uniqueId()}
      />
    ));

    return (
      <div className="ColorPicker" role="radiogroup" aria-label="Color options">
        {colorBoxes}
      </div>
    );
  }
}

export default ColorPicker;

import RandomIcon from "../../assets/icons/random";
import {
  ColorPickerProps,
  NotilyReactColor,
  PresetColorProps,
  RandomColorProps,
} from "../../types";
import { PRESET_COLORS } from "../../utils/colors";
import clsx from "clsx";

const PresetColor = function (props: PresetColorProps) {
  return (
    <div
      className={clsx(["notily-react__color-picker__preset-color"])}
      style={{
        backgroundColor: props.color,
      }}
      onClick={props.onClick}
    ></div>
  );
};

const RandomColor = function (props: RandomColorProps) {
  return (
    <div
      className="notily-react__color-picker__random-color"
      onClick={props.onClick}
      style={{
        color: props.colorHex ?? "#ffffff",
      }}
    >
      <RandomIcon />
    </div>
  );
};

export const ColorPicker = function ({
  currentColor,
  presetColors = PRESET_COLORS,
  onColorChange,
}: ColorPickerProps) {
  const handleClick = (color: NotilyReactColor) => {
    onColorChange?.(color);
  };

  return (
    <div className="notily-react__color-picker">
      {presetColors.map((color) => (
        <PresetColor
          key={color}
          color={color}
          selected={currentColor === color}
          onClick={() => handleClick(color)}
        />
      ))}
      <RandomColor
        onClick={() =>
          handleClick("#" + Math.floor(Math.random() * 16777215).toString(16))
        }
        {...(!presetColors.includes(currentColor) && {
          colorHex: currentColor,
        })}
      />
    </div>
  );
};

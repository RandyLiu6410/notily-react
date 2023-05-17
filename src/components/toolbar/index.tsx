import { useEffect, useRef, useState } from "react";
import { NotilyReactColor, NotilyReactTool, ToolbarProps } from "../../types";
import { ColorPicker } from "../color-picker";
import { Tool } from "./tool";
import { PRESET_COLORS } from "../../utils/colors";
import { takeScreenshot } from "../../utils/screenshot";

const TOOLS: Array<NotilyReactTool> = [
  "draw",
  "arrow",
  "rectangle",
  "circle",
  "text",
];

const Divider = function () {
  return <div className="notily-react__toolbar__divider"></div>;
};

export const Toolbar = function ({
  presetColors = PRESET_COLORS,
  onColorChange,
  onToolChange,
  onScreenshot,
}: ToolbarProps) {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [currentColor, setCurrentColor] = useState<NotilyReactColor>(
    PRESET_COLORS[0]
  );

  useEffect(() => {
    onColorChange?.(currentColor);
  }, [currentColor]);

  const handleSnapshot = async () => {
    // Hide toolbar
    document
      .getElementById("notily-react")
      ?.classList.add("notily-react--screenshoting");

    const screenshotUrl = await takeScreenshot();

    // Show toolbar
    document
      .getElementById("notily-react")
      ?.classList.remove("notily-react--screenshoting");

    onScreenshot?.(screenshotUrl);
  };

  return (
    <div className="notily-react__toolbar" ref={toolbarRef}>
      <ColorPicker
        presetColors={presetColors}
        currentColor={currentColor}
        onColorChange={setCurrentColor}
      />
      <Divider />
      <div className="notily-react__toolbar__tools">
        {TOOLS.map((tool) => (
          <Tool
            key={tool}
            type={tool}
            color={currentColor}
            onClick={() => onToolChange?.(tool)}
          />
        ))}
      </div>
      <Divider />
      <Tool type="eraser" onClick={() => onToolChange?.("eraser")} />
      <Divider />
      <Tool type="snapshot" onClick={handleSnapshot} />
    </div>
  );
};

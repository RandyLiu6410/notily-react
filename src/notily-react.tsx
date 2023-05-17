import { useEffect, useState } from "react";
import {
  NotilyReactProps,
  NotilyReactTool,
  NotilyReactComponent,
} from "./types";
import clsx from "clsx";
import { Toolbar } from "./components/toolbar";

import "./style.css";
import { Canvas } from "./components/canvas";
import { MouseTip } from "./components/mouse-tip";

const NotilyReact = function (props: NotilyReactProps) {
  const { options } = props;

  const [currentColor, setCurrentColor] = useState<string>("");
  const [currentTool, setCurrentTool] = useState<NotilyReactTool>("draw");
  const [components, setComponents] = useState<NotilyReactComponent[]>([]);

  useEffect(() => {
    if (components.length > 0) props.options?.onComponentsChange?.(components);
  }, [props, components]);

  return (
    <div
      className={clsx(["notily-react", options?.className])}
      id="notily-react"
    >
      <Toolbar onColorChange={setCurrentColor} onToolChange={setCurrentTool} />
      <Canvas
        tool={currentTool}
        color={currentColor}
        onRenderComponent={(comp) => setComponents((prev) => [...prev, comp])}
      />
      <MouseTip color={currentColor} tool={currentTool} />
    </div>
  );
};

export default NotilyReact;

export * from "./types";

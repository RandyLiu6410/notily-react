import React, { MouseEventHandler, useRef } from "react";
import { CanvasProps } from "../../types";
import DrawRenderer from "../../renderer/draw";
import RectangleRenderer from "../../renderer/rectangle";

import CircleRenderer from "../../renderer/circle";
import TextRenderer from "../../renderer/text";
import ArrowRenderer from "../../renderer/arrow";
import EraserRenderer from "../../renderer/eraser";

export const Canvas = function (props: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const renderer = useRef<any>(null);

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    if (canvasRef.current) {
      if (props.tool === "draw")
        renderer.current = new DrawRenderer(
          canvasRef.current,
          props.color,
          e as any,
          props.onRenderComponent
        );
      if (props.tool === "rectangle")
        renderer.current = new RectangleRenderer(
          canvasRef.current,
          props.color,
          e as any,
          props.onRenderComponent
        );
      if (props.tool === "circle")
        renderer.current = new CircleRenderer(
          canvasRef.current,
          props.color,
          e as any,
          props.onRenderComponent
        );
      if (props.tool === "text")
        renderer.current = new TextRenderer(
          canvasRef.current,
          props.color,
          e as any,
          props.onRenderComponent
        );
      if (props.tool === "arrow")
        renderer.current = new ArrowRenderer(
          canvasRef.current,
          props.color,
          e as any,
          props.onRenderComponent
        );
      if (props.tool === "eraser") renderer.current = new EraserRenderer();
    }
  };

  const handleMouseUp = () => {
    renderer.current = null;
  };

  return (
    <div
      className="notily-react__canvas"
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    ></div>
  );
};

import React, { useMemo } from "react";
import { ToolProps } from "../../types";
import DrawIcon from "../../assets/icons/draw";
import ArrowIcon from "../../assets/icons/arrow";
import RectangleIcon from "../../assets/icons/rectangle";
import CircleIcon from "../../assets/icons/circle";
import TextIcon from "../../assets/icons/text";
import EraserIcon from "../../assets/icons/eraser";
import SnapshotIcon from "../../assets/icons/snapshot";

export const Tool = function (props: ToolProps) {
  const icon = useMemo(() => {
    if (props.type === "draw") return <DrawIcon />;
    if (props.type === "arrow") return <ArrowIcon />;
    if (props.type === "rectangle") return <RectangleIcon />;
    if (props.type === "circle") return <CircleIcon />;
    if (props.type === "text") return <TextIcon />;
    if (props.type === "eraser") return <EraserIcon />;
    if (props.type === "snapshot") return <SnapshotIcon />;
  }, [props.type]);

  return (
    <div
      className="notily-react__toolbar__tool"
      onClick={props.onClick}
      style={{
        color: props.color ?? "#ffffff",
      }}
    >
      {icon}
    </div>
  );
};

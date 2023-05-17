import React, { useEffect, useMemo, useRef } from "react";
import { MouseTipProps } from "../../types";
import DrawIcon from "../../assets/icons/draw";
import ArrowIcon from "../../assets/icons/arrow";
import RectangleIcon from "../../assets/icons/rectangle";
import CircleIcon from "../../assets/icons/circle";
import TextIcon from "../../assets/icons/text";
import EraserIcon from "../../assets/icons/eraser";

const OFFSET_X = 10;
const OFFSET_Y = 10;

export const MouseTip = function (props: MouseTipProps) {
  const mouseTipRef = useRef<HTMLDivElement>(null);

  const icon = useMemo(() => {
    if (props.tool === "draw") return <DrawIcon />;
    if (props.tool === "arrow") return <ArrowIcon />;
    if (props.tool === "rectangle") return <RectangleIcon />;
    if (props.tool === "circle") return <CircleIcon />;
    if (props.tool === "text") return <TextIcon />;
    if (props.tool === "eraser") return <EraserIcon />;
  }, [props.tool]);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      if (mouseTipRef.current) {
        mouseTipRef.current.style.transform = `translate(${
          e.pageX + OFFSET_X
        }px, ${e.pageY + OFFSET_Y}px)`;
      }
    };

    document.addEventListener("mousemove", mouseMove);

    return () => {
      document.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <div
      className="notily-react__mouse-tip"
      ref={mouseTipRef}
      {...(props.tool !== "eraser" && {
        style: {
          color: props.color ?? "#ffffff",
        },
      })}
    >
      {icon}
    </div>
  );
};

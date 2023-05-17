import Renderer from ".";
import { onRenderComponentCb } from "../types";

class ArrowRenderer extends Renderer {
  node: HTMLDivElement;
  body: HTMLDivElement;
  h: HTMLDivElement;
  length = 0;
  angle = 0;

  static nodeClassname = "notily-react__canvas__component-node--arrow";
  static arrowBodyClassname =
    "notily-react__canvas__component-node--arrow--body";
  static arrowHeadClassname =
    "notily-react__canvas__component-node--arrow--head";

  constructor(
    canvas: HTMLDivElement,
    color: string,
    e: MouseEvent,
    cb?: onRenderComponentCb
  ) {
    super(canvas, color, e, cb);

    const node = document.createElement("div");
    node.classList.add(Renderer.nodeClassname);
    node.classList.add(ArrowRenderer.nodeClassname);

    const body = document.createElement("div");
    body.classList.add(ArrowRenderer.arrowBodyClassname);
    body.style.borderColor = color;
    body.style.borderWidth = `${Math.floor(
      this.lineWidth / 2
    )}px 0px ${Math.floor(this.lineWidth / 2)}px 0px`;

    const h = document.createElement("div");
    h.classList.add(ArrowRenderer.arrowHeadClassname);
    h.style.borderColor = `${color} ${color} transparent transparent`;
    h.style.borderWidth = `${this.lineWidth}px`;
    h.style.transform = `translateX(${Math.floor(
      this.lineWidth / 2
    )}px) rotate(45deg)`;

    body.appendChild(h);
    node.appendChild(body);

    this.node = node;
    this.body = body;
    this.h = h;

    this.container.appendChild(node);

    this.onRenderComponentCb?.({
      tool: "arrow",
      element: this.node,
    });
  }

  onMouseMove(e: MouseEvent) {
    this._onMouseMove(e);

    this._calculateLength(e.pageX, e.pageY);
    this._getAngleWithXAxis(
      e.pageX - this.initialPosition!.x,
      e.pageY - this.initialPosition!.y
    );
  }

  _calculateLength(x: number, y: number) {
    this.length = Math.hypot(
      Math.abs(x - this.initialPosition!.x),
      Math.abs(y - this.initialPosition!.y)
    );

    this.body.style.width = `${this.length}px`;
  }

  _getAngleWithXAxis(x: number, y: number) {
    // 使用 Math.atan2() 函数来计算弧度值
    const radian = Math.atan2(y, x);

    // 将弧度转换为角度
    let degree = radian * (180 / Math.PI);

    // 将角度限制在 0 到 360 之间
    if (degree < 0) {
      degree += 360;
    }

    this.angle = degree;

    this.node.style.transform = `rotate(${this.angle}deg)`;
  }
}

export default ArrowRenderer;

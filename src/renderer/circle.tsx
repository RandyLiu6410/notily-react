import Renderer from ".";
import { onRenderComponentCb } from "../types";

class CircleRenderer extends Renderer {
  node: HTMLDivElement;

  static nodeClassname = "notily-react__canvas__component-node--circle";

  constructor(
    canvas: HTMLDivElement,
    color: string,
    e: MouseEvent,
    cb?: onRenderComponentCb
  ) {
    super(canvas, color, e, cb);

    const node = document.createElement("div");
    node.classList.add(Renderer.nodeClassname);
    node.classList.add(CircleRenderer.nodeClassname);
    node.style.borderColor = this.color;
    node.style.borderWidth = `${this.lineWidth}px`;
    this.node = node;

    this.container.appendChild(node);

    this.onRenderComponentCb?.({
      tool: "circle",
      element: this.node,
    });
  }

  onMouseMove(e: MouseEvent) {
    this._onMouseMove(e);
    this._calculateTransform(e.pageX, e.pageY);
  }
}

export default CircleRenderer;

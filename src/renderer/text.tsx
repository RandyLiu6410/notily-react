import Renderer from ".";
import { onRenderComponentCb } from "../types";

class TextRenderer extends Renderer {
  node: HTMLInputElement;

  static nodeClassname = "notily-react__canvas__component-node--text";

  constructor(
    canvas: HTMLDivElement,
    color: string,
    e: MouseEvent,
    cb?: onRenderComponentCb
  ) {
    super(canvas, color, e, cb);

    this._initPosition(e);

    const node = document.createElement("input");
    node.classList.add(Renderer.nodeClassname);
    node.classList.add(TextRenderer.nodeClassname);
    node.style.borderColor = this.color;
    node.style.color = this.color;
    node.placeholder = "Text...";
    node.onmousedown = function (...args) {
      args[0].stopPropagation();
    };

    this.node = node;

    this.container.appendChild(node);

    this.onRenderComponentCb?.({
      tool: "text",
      element: this.node,
    });
  }
}

export default TextRenderer;

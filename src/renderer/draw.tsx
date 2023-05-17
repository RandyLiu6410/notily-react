import Renderer from ".";
import { onRenderComponentCb } from "../types";
import "../canvas2svg";

declare global {
  interface Window {
    C2S: any;
  }
}

class DrawRenderer extends Renderer {
  node!: HTMLCanvasElement;
  positions: Array<{ x: number; y: number }> = [];

  left = Infinity;
  right = -Infinity;
  top = Infinity;
  bottom = -Infinity;

  static nodeClassname = "notily-react__canvas__component-node--draw";
  static drawingClassname = DrawRenderer.nodeClassname + "--drawing";

  constructor(
    canvas: HTMLDivElement,
    color: string,
    e: MouseEvent,
    cb?: onRenderComponentCb
  ) {
    super(canvas, color, e, cb);

    this._initCanvas();

    this.canvas.addEventListener(
      "mouseup",
      () => {
        this._canvas2svg();
      },
      { once: true }
    );
  }

  onMouseMove(e: MouseEvent) {
    const x = e.pageX;
    const y = e.pageY;

    this.positions.push({ x, y });

    if (x < this.left) this.left = x;
    if (x > this.right) this.right = x;
    if (y < this.top) this.top = y;
    if (y > this.bottom) this.bottom = y;

    this._draw();
  }

  _initCanvas() {
    const viewportWidth =
      window.innerWidth || document.documentElement.clientWidth;
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;

    const node = document.createElement("canvas");
    node.classList.add(Renderer.nodeClassname);
    node.classList.add(DrawRenderer.nodeClassname);
    node.classList.add(DrawRenderer.drawingClassname);
    node.width = viewportWidth;
    node.height = viewportHeight;

    this.node = node;
    this.container.appendChild(node);

    this._draw();
  }

  _draw() {
    const ctx = this.node.getContext("2d");
    if (!ctx) throw new Error("Cannot find ctx.");

    const offsetLeft = 0;
    const offsetTop = 0;

    // Clear the canvas
    ctx.clearRect(0, 0, this.node.width, this.node.height);

    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;

    if (this.positions.length > 0) {
      // Draw the mouse path
      ctx.beginPath();
      ctx.moveTo(
        this.positions[0].x - offsetLeft,
        this.positions[0].y - offsetTop
      );
      for (let i = 1; i < this.positions.length; i++) {
        ctx.lineTo(
          this.positions[i].x - offsetLeft,
          this.positions[i].y - offsetTop
        );
      }
      ctx.stroke();
    }
  }

  _canvas2svg() {
    //Create a new mock canvas context. Pass in your desired width and height for your svg document.
    const width =
      this.right - this.left === -Infinity ? 0 : this.right - this.left || 1;
    const height =
      this.bottom - this.top === -Infinity ? 0 : this.bottom - this.top || 1;

    const ctx = new window.C2S(width, height);

    const offsetLeft = this.left === Infinity ? 0 : this.left;
    const offsetTop = this.top === Infinity ? 0 : this.top;

    //draw your canvas like you would normally
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;

    if (this.positions.length > 0) {
      // Draw the mouse path
      ctx.beginPath();
      ctx.moveTo(
        this.positions[0].x - offsetLeft,
        this.positions[0].y - offsetTop
      );
      for (let i = 1; i < this.positions.length; i++) {
        ctx.lineTo(
          this.positions[i].x - offsetLeft,
          this.positions[i].y - offsetTop
        );
      }
      ctx.stroke();
    }

    //If you really need to you can access the shadow inline SVG created by calling:
    const svg = ctx.getSvg();
    svg.classList.add(Renderer.nodeClassname);
    svg.classList.add(DrawRenderer.nodeClassname);
    this.container.removeChild(this.node);
    svg.style.overflow = "visible";
    this.container.appendChild(svg);

    // avoid svg stoke overflow
    const padding = 10;

    this.container.style.display = "flex";
    this.container.style.overflow = "visible";
    this.container.style.left = `${offsetLeft - padding}px`;
    this.container.style.top = `${offsetTop - padding}px`;
    this.container.style.padding = `${padding}px`;

    this.onRenderComponentCb?.({
      tool: "draw",
      element: svg,
    });
  }
}

export default DrawRenderer;

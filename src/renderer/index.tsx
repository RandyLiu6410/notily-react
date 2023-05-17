import { onRenderComponentCb } from "../types";

class Renderer {
  canvas: HTMLDivElement;
  color: string;
  container!: HTMLElement;
  initialPosition: { x: number; y: number } | null = null;
  onRenderComponentCb?: onRenderComponentCb;

  lineWidth = 10;

  constructor(
    canvas: HTMLDivElement,
    color: string,
    e: MouseEvent,
    cb?: onRenderComponentCb
  ) {
    this.canvas = canvas;
    this.color = color;

    this._createContainer();

    const onMouseMove = this.onMouseMove.bind(this);

    this.canvas.addEventListener("mousemove", onMouseMove);
    this.canvas.addEventListener(
      "mouseup",
      () => {
        this.canvas.removeEventListener("mousemove", onMouseMove);
      },
      { once: true }
    );

    this._initPosition(e);

    this.onRenderComponentCb = cb;
  }

  static containerClassname = "notily-react__canvas__component-container";
  static nodeClassname = "notily-react__canvas__component-node";

  _createContainer() {
    const elem = document.createElement("div");
    elem.classList.add(Renderer.containerClassname);

    this.canvas.appendChild(elem);
    this.container = elem;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onMouseMove(_e?: MouseEvent) {
    //
  }

  _initPosition(e: MouseEvent) {
    this.initialPosition = {
      x: e.pageX,
      y: e.pageY,
    };
    this.container.style.left = `${e.pageX}px`;
    this.container.style.top = `${e.pageY}px`;
  }

  _onMouseMove(e: MouseEvent) {
    const width = Math.abs(e.pageX - this.initialPosition!.x);
    const height = Math.abs(e.pageY - this.initialPosition!.y);

    this.container.style.width = `${width}px`;
    this.container.style.height = `${height}px`;
  }

  _calculateTransform(x: number, y: number) {
    let transform = "";
    if (x - this.initialPosition!.x < 0) {
      transform += `translateX(-${this.container.style.width}) `;
    }
    if (y - this.initialPosition!.y < 0) {
      transform += `translateY(-${this.container.style.height}) `;
    }
    if (x - this.initialPosition!.x > 0 && y - this.initialPosition!.y > 0)
      transform = "";

    if (transform.length > 0) this.container.style.transform = transform;
    else this.container.style.removeProperty("transform");
  }
}

export default Renderer;

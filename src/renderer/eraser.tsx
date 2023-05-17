import Renderer from ".";

class EraserRenderer {
  constructor() {
    const onMouseDown = this._onMouseDown.bind(this);

    document.addEventListener("mousedown", onMouseDown, { once: true });
  }

  _onMouseDown(e: MouseEvent) {
    if (e.target instanceof HTMLElement || e.target instanceof SVGElement) {
      let parent: any = e.target.parentElement;
      while (parent && parent !== document) {
        if (this._isNotilyReactContainer(parent)) {
          parent.parentElement.removeChild(parent);
          break;
        }
        parent = parent.parentElement;
      }
    }
  }

  _isNotilyReactNode(elem: HTMLElement) {
    return Array.from(elem.classList).some((className: string) =>
      className.startsWith(Renderer.nodeClassname)
    );
  }

  _isNotilyReactContainer(elem: HTMLElement) {
    return Array.from(elem.classList).some((className: string) =>
      className.startsWith(Renderer.containerClassname)
    );
  }
}

export default EraserRenderer;

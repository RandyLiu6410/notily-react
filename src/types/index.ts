export interface NotilyReactProps {
  options?: NotilyReactOptions;
}

export interface NotilyReactOptions {
  className?: string;
  onComponentsChange?: (components: NotilyReactComponent[]) => void;
}

export type NotilyReactColor = string;

export interface PresetColorProps {
  color: NotilyReactColor;
  selected?: boolean;
  onClick?: () => void;
}

export interface RandomColorProps {
  colorHex?: string;
  selected?: boolean;
  onClick?: () => void;
}

export interface ColorPickerProps {
  currentColor: NotilyReactColor;
  presetColors: NotilyReactColor[];
  onColorChange?: (color: NotilyReactColor) => void;
}

export interface NotilyReactComponent {
  tool: NotilyReactTool;
  element: HTMLDivElement;
}

export type NotilyReactTool =
  | "draw"
  | "arrow"
  | "rectangle"
  | "circle"
  | "text"
  | "eraser"
  | "snapshot";

export interface ToolbarProps {
  presetColors?: NotilyReactColor[];
  onColorChange?: (color: string) => void;
  onToolChange?: (tool: NotilyReactTool) => void;
  onScreenshot?: (url: string) => void;
}

export interface ToolProps {
  type: NotilyReactTool;
  color?: string;
  selected?: boolean;
  onClick?: () => void;
}

export type onRenderComponentCb = (component: NotilyReactComponent) => void;

export interface CanvasProps {
  tool: NotilyReactTool;
  color: string;
  onRenderComponent?: onRenderComponentCb;
}

export interface MouseTipProps {
  tool: NotilyReactTool;
  color?: string;
}

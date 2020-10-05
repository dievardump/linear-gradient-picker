export type RGBColor = { r: number; g: number; b: number };
export type RGBAColor = { r: number; g: number; b: number; a: number };
export type ColorMix = string | number[] | RGBColor | RGBAColor;
export type GradientColor = { color: RGBAColor; position: number };

export interface LinearGradientPickerInterface {
  addColorStop(color: ColorMix, position: number): LinearGradientPicker;
  pick(at: number): RGBAColor;
}

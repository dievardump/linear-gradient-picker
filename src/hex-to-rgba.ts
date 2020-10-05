import type { RGBAColor } from './interfaces';

export default function hex_to_rgba(hex: string): RGBAColor {
  let r;
  let g;
  let b;
  let a = 1;

  if (hex.length === 4 || hex.length === 5) {
    r = parseInt(''.padStart(2, hex.substr(1, 1)), 16);
    g = parseInt(''.padStart(2, hex.substr(2, 1)), 16);
    b = parseInt(''.padStart(2, hex.substr(3, 1)), 16);
    if (hex.length === 5) {
      a = parseInt(''.padStart(2, hex.substr(4, 1)), 16);
      a = a / 255;
    }
  } else if (hex.length === 7 || hex.length === 9) {
    r = parseInt(hex.substr(1, 2), 16);
    g = parseInt(hex.substr(3, 2), 16);
    b = parseInt(hex.substr(5, 2), 16);
    if (hex.length === 9) {
      a = parseInt(hex.substr(7, 2), 16);
      a = a / 255;
    }
  }

  return { r, g, b, a };
}

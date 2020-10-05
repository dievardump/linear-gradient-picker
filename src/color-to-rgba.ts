import type { ColorMix, RGBAColor } from './interfaces';

import hex_to_rgba from './hex-to-rgba';

export default function color_to_rgba(color: ColorMix): RGBAColor {
  let result: RGBAColor;
  if ('string' === typeof color) {
    const cleaned = color.replace(/[^#0-9a-fA-F]/g, '');
    if (cleaned.length === color.length && [4, 5, 7, 9].indexOf(color.length) !== -1 && color[0] === '#') {
      result = hex_to_rgba(color);
    }
  } else if (Array.isArray(color)) {
    result = {
      r: color[0],
      g: color[1],
      b: color[2],
      a: color[3] || 1,
    };
  } else {
    color = {
      a: 1,
      ...color,
    };
  }

  return result;
}

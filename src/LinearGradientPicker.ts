import type { ColorMix, RGBAColor, GradientColor, LinearGradientPickerInterface } from './interfaces';

import color_to_rgba from './color-to-rgba';

export default class LinearGradientPicker implements LinearGradientPickerInterface {
  private colors: GradientColor[] = [];

  private getAt(at: number): RGBAColor {
    // find color before and after
    let selectedIndex: number = 0;
    for (let i = 0; i < this.colors.length; i++) {
      if (this.colors[i].position > at) {
        selectedIndex = i;
        break;
      }
    }

    const left: GradientColor = this.colors[Math.max(selectedIndex - 1, 0)];
    const right: GradientColor = this.colors[selectedIndex];

    let r;
    let g;
    let b;
    let a;
    if (left !== right) {
      // where to pick in the transition left->right
      const ratio = (at - left.position) / (right.position - left.position);
      r = Math.ceil(Math.abs(ratio * right.color.r + (1 - ratio) * left.color.r));
      g = Math.ceil(Math.abs(ratio * right.color.g + (1 - ratio) * left.color.g));
      b = Math.ceil(Math.abs(ratio * right.color.b + (1 - ratio) * left.color.b));
      a = Math.abs(ratio * right.color.a + (1 - ratio) * left.color.a);
    } else {
      r = left.color.r;
      g = left.color.g;
      b = left.color.b;
      a = left.color.a;
    }

    return {
      r,
      g,
      b,
      a,
    };
  }

  addColorStop(color: ColorMix, position: number): LinearGradientPicker {
    if ('number' !== typeof position || position < 0 || position > 100) {
      throw new Error('Position has to be a number in the range [0; 100]');
    }

    for (const item of this.colors) {
      if (item.position === position) {
        throw new Error(`Can't have two colors at the same position`);
      }
    }
    // add color to the list
    const rgbaColor: RGBAColor = color_to_rgba(color);
    this.colors.push({
      color: rgbaColor,
      position,
    });

    // order the list
    this.colors.sort((a, b) => {
      return a.position - b.position;
    });

    return this;
  }

  pick(at: number): RGBAColor {
    if (this.colors.length === 0) {
      throw new Error('You need to add at least 1 color.');
    }

    if ('number' !== typeof at || at < 0 || at > 100) {
      throw new Error('Picked position must be a number in the range [0; 100]');
    }

    return this.getAt(at);
  }
}

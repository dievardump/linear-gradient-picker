import type { ColorMix, RGBAColor, GradientColor, LinearGradientPickerInterface } from './interfaces';

import color_to_rgba from './color-to-rgba';

export default class LinearGradientPicker implements LinearGradientPickerInterface {
  private colors: GradientColor[] = [];

  private getAt(at: number): RGBAColor {
    // find color before and after
    let selectedIndex: number = 0;
    for (let i = this.colors.length - 1; i > 0; i--) {
			if (at >= this.colors[i].position) {
				selectedIndex = i;
        break;
      }
    }

    const left: GradientColor = this.colors[selectedIndex];
    const right: GradientColor = this.colors[Math.min(selectedIndex + 1, this.colors.length - 1)];

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

    return { r, g, b, a, };
  }

	/**
	 * Add a color stop to the gradient
	 */
  addColorStop(color: ColorMix, position: number): LinearGradientPicker {
		// throw if position is not in [0; 100]
    if ('number' !== typeof position || position < 0 || position > 100) {
      throw new Error('Position has to be a number in the range [0; 100]');
    }

		// throw if a color stop is already at this position
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

	/**
	 * Retuns color at positions {at}
	 *
	 * @param at Number
	 */
  pick(at: number): RGBAColor {
		// throw is no color were added
    if (this.colors.length === 0) {
      throw new Error('You need to add at least 1 color.');
    }

		// throw if at not in [0, 100]
    if ('number' !== typeof at || at < 0 || at > 100) {
      throw new Error('Picked position must be a number in the range [0; 100]');
    }

    return this.getAt(at);
  }
}

# LinearGradientPicker

Small library to programmatically pick the color at a given position in a linear-gradient.

## Usage

Install lib

```sh
npm install linear-gradient-picker --save-dev
```

```js
// Import and create object
import LinearGradientPicker from 'linear-gradient-picker';
const picker = new LinearGradientPicker();

//Add color stops
picker
  .addColorStop('#030075', 0)
  .addColorStop('#162fbc', 20)
  .addColorStop('#23a5f8', 40)
  .addColorStop('#91ddc1', 60)
  .addColorStop('#d7eb87', 80)
  .addColorStop('#f8f26a', 100);

//Pick at positions :
console.log(picker.pick(10)); // => { r: 13, g: 24, b: 153, a: 1 }
console.log(picker.pick(33)); // => { r: 31, g: 124, b: 227, a: 1 }
console.log(picker.pick(42)); // => { r: 46, g: 171, b: 243, a: 1 }
console.log(picker.pick(99)); // => { r: 247, g: 242, b: 108, a: 1 }
```

## API

```js
picker.addColorStop(color: string | number[] | { r, g, b, a? }, position : number)
```

Add a color stop to the gradient.

`color`:

- an hex string of length 3 (i.e #000), 4 (i.e #000f), 7 (i.e #000000) or 9 (i.e #000000ff).
- an object `{ r, g, b }` or `{ r, g, b, a }`
- an array of integers `[r, g, b]` or `[r, g, b, a]`

`position` a number in range [0; 100]

```js
picker.pick((position: number));
```

`position` a number in range [0; 100]

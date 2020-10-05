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
console.log(picker.pick(10));
console.log(picker.pick(33));
console.log(picker.pick(42));
console.log(picker.pick(99));
```

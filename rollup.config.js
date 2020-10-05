import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';
export default [
  // browsers
  {
    input: 'src/index.ts',
    output: [
      {
        name: 'LinearGradientPicker',
        file: pkg.browser,
        format: 'umd',
      },
    ],
    plugins: [typescript()],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        name: 'LinearGradientPicker',
        file: pkg.browser.replace('.js', '.min.js'),
        format: 'umd',
      },
    ],
    plugins: [typescript(), terser()],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/index.ts',
    plugins: [
      typescript(), // so Rollup can convert TypeScript to JavaScript
    ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
  },
  {
    input: 'src/index.ts',
    plugins: [typescript(), terser()],
    output: [
      { file: pkg.main.replace('.js', '.min.js'), format: 'cjs' },
      { file: pkg.module.replace('.js', '.min.js'), format: 'es' },
    ],
  },
];

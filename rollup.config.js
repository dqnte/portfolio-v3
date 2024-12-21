import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import scss from 'rollup-plugin-scss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import serve from 'rollup-plugin-serve';

const packageJson = require('./package.json');

export default {
  input: 'src/index.jsx', // Your entry file
  output: [
    {
      file: packageJson.main, // Output file for CommonJS
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module, // Output file for ES modules
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(), // Automatically marks peer dependencies as external
    resolve(), // Resolves Node.js modules
    commonjs(), // Converts CommonJS modules to ES6
    typescript({
      tsconfig: './tsconfig.json',
      jsx: 'preserve', // Let Babel handle JSX
    }),
    babel({
      presets: [
        '@babel/preset-env', // For modern JavaScript
        '@babel/preset-react', // For React and JSX
      ],
      extensions: ['.js', '.jsx', '.ts', '.tsx'], // Include JS, JSX, TS, and TSX files
      babelHelpers: 'bundled', // Required by Rollup Babel plugin
    }),
    postcss({
      extract: true, // Extract CSS to a separate file
      minimize: true, // Minimize CSS output
    }),
    scss({
      output: 'dist/styles.css', // Output for SCSS styles
      failOnError: true,
    }),
    serve({
      contentBase: 'dist', // Directory to serve
      port: 3000, // Port number
      open: true, // Automatically open the browser
    }),
  ],
  external: [...Object.keys(packageJson.peerDependencies || {})], // Externalize peer dependencies
};


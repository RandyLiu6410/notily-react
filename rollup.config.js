import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import copy from "rollup-plugin-copy";
import dts from "rollup-plugin-dts";
import postcssDts from "postcss-typescript-d-ts";
import postcss from "rollup-plugin-postcss";

import fs from "fs";
import path from "path";

const distDir = path.resolve("./dist");
const srcDir = path.resolve("./src");

const mainConfig = {
  input: "src/index.ts", // Entry point of your application
  output: [
    {
      file: `dist/index.esm.js`,
      format: "esm",
      sourcemap: true,
    },
    {
      file: `dist/index.js`,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: `dist/index.min.js`,
      format: "umd",
      name: "NotilyReact",
      plugins: [terser()],
      sourcemap: true,
      globals: {
        react: "React",
      },
    },
  ],
  plugins: [
    nodeResolve(), // Resolve third-party modules
    commonjs(), // Convert CommonJS modules to ES modules]
    typescript({
      tsconfig: "./tsconfig.build.json",
      declaration: false,
    }),
    postcss({
      extract: "style.css",
      sourceMap: true,
      plugins: [
        postcssDts({
          writeFile: ({ content }) => {
            if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);
            fs.writeFileSync(`${srcDir}/style.css.d.ts`, content);
            fs.writeFileSync(`dist/style.css.d.ts`, content);
          },
        }),
      ],
    }),
    // Create module.css
    copy({
      targets: [
        {
          src: "./src/style.css",
          dest: "./dist",
          rename: "style.module.css",
          transform: (contents) =>
            contents
              .toString()
              .replace(/\.rdp-/g, ".")
              .replace(/\.rdp/g, ".root"),
        },
      ],
    }),
  ],
  external: ["react", "react-dom"], // Specify external dependencies
};

export const dtsConfig = {
  input: `src/index.ts`,
  output: [{ file: `dist/index.d.ts`, format: "es" }],
  plugins: [
    dts({
      tsconfig: "./tsconfig.build.json",
      compilerOptions: {
        preserveSymlinks: false,
      },
    }),
  ],
};

export default [mainConfig, dtsConfig];

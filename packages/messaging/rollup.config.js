/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import json from '@rollup/plugin-json';
import pkg from './package.json';
import typescript from 'typescript';
import replace from 'rollup-plugin-replace';
import typescriptPlugin from 'rollup-plugin-typescript2';
import { generateBuildTargetReplaceConfig } from '../../scripts/build/rollup_replace_build_target';

const deps = Object.keys(
  Object.assign({}, pkg.peerDependencies, pkg.dependencies)
);

/**
 * ES5 Builds
 */
const es5BuildPlugins = [
  typescriptPlugin({
    typescript
  }),
  json()
];

const es5Builds = [
  {
    input: 'src/index.ts',
    output: [{ file: pkg.main, format: 'cjs', sourcemap: true }],
    plugins: [
      ...es5BuildPlugins,
      replace(generateBuildTargetReplaceConfig('cjs', 5))
    ],
    external: id => deps.some(dep => id === dep || id.startsWith(`${dep}/`))
  },
  {
    input: 'src/index.ts',
    output: [{ file: pkg.esm5, format: 'es', sourcemap: true }],
    plugins: [
      ...es5BuildPlugins,
      replace(generateBuildTargetReplaceConfig('esm', 5))
    ],
    external: id => deps.some(dep => id === dep || id.startsWith(`${dep}/`))
  }
];

/**
 * ES2017 Builds
 */
const es2017BuildPlugins = [
  typescriptPlugin({
    typescript,
    tsconfigOverride: {
      compilerOptions: {
        target: 'es2017'
      }
    }
  }),
  json({ preferConst: true })
];

const es2017Builds = [
  {
    input: 'src/index.ts',
    output: {
      file: pkg.browser,
      format: 'es',
      sourcemap: true
    },
    plugins: [
      ...es2017BuildPlugins,
      replace(generateBuildTargetReplaceConfig('esm', 2017))
    ],
    external: id => deps.some(dep => id === dep || id.startsWith(`${dep}/`))
  },
  // sw builds
  {
    input: 'src/index.sw.ts',
    output: { file: pkg.sw, format: 'es', sourcemap: true },
    plugins: es2017BuildPlugins,
    external: id => deps.some(dep => id === dep || id.startsWith(`${dep}/`))
  }
];

export default [...es5Builds, ...es2017Builds];

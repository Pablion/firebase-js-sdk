/**
 * @license
 * Copyright 2020 Google LLC
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

import { projectRoot } from '../../../../../release/utils';

export function retrieveTestModuleDtsFile(): string {
  const moduleLocation = `${projectRoot}/scripts/exp/modular-export-binary-size-analysis/test/test-exp`;
  const packageJson = require(`${moduleLocation}/package.json`);
  const TYPINGS: string = 'typings';

  return `${moduleLocation}/${packageJson[TYPINGS]}`;
}

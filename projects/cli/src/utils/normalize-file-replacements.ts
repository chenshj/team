/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  BaseException,
  Path,
  getSystemPath,
  join,
  normalize,
  virtualFs,
} from '@angular-devkit/core';
import {
  CurrentFileReplacement,
  DeprecatedFileReplacment,
  FileReplacement,
} from '../browser/schema';


export class MissingFileReplacementException extends BaseException {
  constructor(path: String) {
    super(`The ${path} path in file replacements does not exist.`);
  }
}

export interface NormalizedFileReplacement {
  replace: Path;
  with: Path;
}

export function normalizeFileReplacements(
  fileReplacements: FileReplacement[],
  host: virtualFs.SyncDelegateHost,
  root: Path,
): NormalizedFileReplacement[] {
  if (fileReplacements.length === 0) {
    return [];
  }

  const normalizedReplacement = fileReplacements
    .map(replacement => normalizeFileReplacement(replacement, root));

  for (const { replace, with: replacementWith } of normalizedReplacement) {
    if (!host.exists(replacementWith)) {
      throw new MissingFileReplacementException(getSystemPath(replacementWith));
    }

    if (!host.exists(replace)) {
      throw new MissingFileReplacementException(getSystemPath(replace));
    }
  }

  return normalizedReplacement;
}

function normalizeFileReplacement(
  fileReplacement: FileReplacement,
  root?: Path,
): NormalizedFileReplacement {
  const currentFormat = fileReplacement as CurrentFileReplacement;
  const maybeOldFormat = fileReplacement as DeprecatedFileReplacment;

  let replacePath: Path;
  let withPath: Path;
  if (maybeOldFormat.src && maybeOldFormat.replaceWith) {
    replacePath = normalize(maybeOldFormat.src);
    withPath = normalize(maybeOldFormat.replaceWith);
  } else {
    replacePath = normalize(currentFormat.replace);
    withPath = normalize(currentFormat.with);
  }

  // TODO: For 7.x should this only happen if not absolute?
  if (root) {
    replacePath = join(root, replacePath);
  }
  if (root) {
    withPath = join(root, withPath);
  }

  return { replace: replacePath, with: withPath };
}

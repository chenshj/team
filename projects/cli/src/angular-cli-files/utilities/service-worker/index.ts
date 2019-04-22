/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// TODO: cleanup this file, it's copied as is from Angular CLI.
import {
  Path,
  dirname,
  getSystemPath,
  join,
  normalize,
  tags,
  virtualFs,
} from '@angular-devkit/core';
import {
  Filesystem,
  Generator,
} from '@angular/service-worker/config'; // tslint:disable-line:no-implicit-dependencies
import * as crypto from 'crypto';
import * as fs from 'fs';
import { Observable, from, merge, of } from 'rxjs';
import { concatMap, map, mergeMap, reduce, switchMap, toArray } from 'rxjs/operators';
import * as semver from 'semver';
import { resolveProjectModule } from '../require-project-module';


export const NEW_SW_VERSION = '5.0.0-rc.0';


class CliFilesystem implements Filesystem {
  constructor(private _host: virtualFs.Host, private base: string) { }

  list(path: string): Promise<string[]> {
    const recursiveList = (path: Path): Observable<Path> => this._host.list(path).pipe(
      // Emit each fragment individually.
      concatMap(fragments => from(fragments)),
      // Join the path with fragment.
      map(fragment => join(path, fragment)),
      // Emit directory content paths instead of the directory path.
      mergeMap(path => this._host.isDirectory(path).pipe(
          concatMap(isDir => isDir ? recursiveList(path) : of(path)),
        ),
      ),
    );

    return recursiveList(this._resolve(path)).pipe(
      map(path => path.replace(this.base, '')),
      toArray(),
    ).toPromise().then(x => x, _err => []);
  }

  read(path: string): Promise<string> {
    return this._readIntoBuffer(path)
      .then(content => virtualFs.fileBufferToString(content));
  }

  hash(path: string): Promise<string> {
    const sha1 = crypto.createHash('sha1');

    return this._readIntoBuffer(path)
      .then(content => sha1.update(Buffer.from(content)))
      .then(() => sha1.digest('hex'));
  }

  write(path: string, content: string): Promise<void> {
    return this._host.write(this._resolve(path), virtualFs.stringToFileBuffer(content))
      .toPromise();
  }

  private _readIntoBuffer(path: string): Promise<virtualFs.FileBuffer> {
    return this._host.read(this._resolve(path))
      .toPromise();
  }

  private _resolve(path: string): Path {
    return join(normalize(this.base), path);
  }
}

export function usesServiceWorker(projectRoot: string): boolean {
  let swPackageJsonPath;

  try {
    swPackageJsonPath = resolveProjectModule(projectRoot, '@angular/service-worker/package.json');
  } catch (_) {
    // @angular/service-worker is not installed
    throw new Error(tags.stripIndent`
    Your project is configured with serviceWorker = true, but @angular/service-worker
    is not installed. Run \`npm install --save-dev @angular/service-worker\`
    and try again, or run \`ng set apps.0.serviceWorker=false\` in your .angular-cli.json.
  `);
  }

  const swPackageJson = fs.readFileSync(swPackageJsonPath).toString();
  const swVersion = JSON.parse(swPackageJson)['version'];

  if (!semver.gte(swVersion, NEW_SW_VERSION)) {
    throw new Error(tags.stripIndent`
    The installed version of @angular/service-worker is ${swVersion}. This version of the CLI
    requires the @angular/service-worker version to satisfy ${NEW_SW_VERSION}. Please upgrade
    your service worker version.
  `);
  }

  return true;
}

export function augmentAppWithServiceWorker(
  host: virtualFs.Host,
  projectRoot: Path,
  appRoot: Path,
  outputPath: Path,
  baseHref: string,
  ngswConfigPath?: string,
): Promise<void> {
  // Path to the worker script itself.
  const distPath = normalize(outputPath);
  const workerPath = normalize(
    resolveProjectModule(getSystemPath(projectRoot), '@angular/service-worker/ngsw-worker.js'),
  );
  const swConfigPath = resolveProjectModule(
    getSystemPath(projectRoot),
    '@angular/service-worker/config',
  );
  const safetyPath = join(dirname(workerPath), 'safety-worker.js');
  const configPath = ngswConfigPath as Path || join(appRoot, 'ngsw-config.json');

  return host.exists(configPath).pipe(
    switchMap(exists => {
      if (!exists) {
        throw new Error(tags.oneLine`
          Error: Expected to find an ngsw-config.json configuration
          file in the ${appRoot} folder. Either provide one or disable Service Worker
          in your angular.json configuration file.`,
        );
      }

      return host.read(configPath) as Observable<virtualFs.FileBuffer>;
    }),
    map(content => JSON.parse(virtualFs.fileBufferToString(content))),
    switchMap(configJson => {
      const GeneratorConstructor = require(swConfigPath).Generator as typeof Generator;
      const gen = new GeneratorConstructor(new CliFilesystem(host, outputPath), baseHref);

      return gen.process(configJson);
    }),

    switchMap(output => {
      const manifest = JSON.stringify(output, null, 2);

      return host.read(workerPath).pipe(
        switchMap(workerCode => {
          return merge(
            host.write(join(distPath, 'ngsw.json'), virtualFs.stringToFileBuffer(manifest)),
            host.write(join(distPath, 'ngsw-worker.js'), workerCode),
          ) as Observable<void>;
        }),
      );
    }),

    switchMap(() => host.exists(safetyPath)),
    // If @angular/service-worker has the safety script, copy it into two locations.
    switchMap(exists => {
      if (!exists) {
        return of<void>(undefined);
      }

      return host.read(safetyPath).pipe(
        switchMap(safetyCode => {
          return merge(
            host.write(join(distPath, 'worker-basic.min.js'), safetyCode),
            host.write(join(distPath, 'safety-worker.js'), safetyCode),
          ) as Observable<void>;
        }),
      );
    }),

    // Remove all elements, reduce them to a single emit.
    reduce(() => {}),
  ).toPromise();
}

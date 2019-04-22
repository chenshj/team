/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {
  BuildEvent,
  Builder,
  BuilderConfiguration,
  BuilderContext,
} from '@angular-devkit/architect';
import { RollupBuilder } from '../build_rollup/src';
import { Path, getSystemPath, join, normalize, resolve, virtualFs } from '@angular-devkit/core';
import * as fs from 'fs';
import { Observable, concat, of, throwError } from 'rxjs';
import { concatMap, last, tap } from 'rxjs/operators';
import * as ts from 'typescript'; // tslint:disable-line:no-implicit-dependencies
import { RollupConfigOptions } from '../angular-cli-files/models/build-options';
import {
  getAotConfig,
  getBrowserConfig,
  getCommonConfig,
  getNonAotConfig,
  getStatsConfig,
  getStylesConfig,
} from '../angular-cli-files/models/webpack-configs';
import { readTsconfig } from '../angular-cli-files/utilities/read-tsconfig';
import { requireProjectModule } from '../angular-cli-files/utilities/require-project-module';
import { augmentAppWithServiceWorker } from '../angular-cli-files/utilities/service-worker';
import { defaultProgress, normalizeBuilderSchema } from '../utils';
import { BrowserBuilderSchema, NormalizedBrowserBuilderSchema } from './schema';
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const webpackMerge = require('webpack-merge');

// tslint:disable-next-line: deprecation
export class BrowserBuilder implements Builder<BrowserBuilderSchema> {

// tslint:disable-next-line: deprecation
  constructor(public context: BuilderContext) { }

// tslint:disable-next-line: deprecation
  protected createRollupBuilder(context: BuilderContext): RollupBuilder {
    return new RollupBuilder(context);
  }

// tslint:disable-next-line: deprecation
  run(builderConfig: BuilderConfiguration<BrowserBuilderSchema>): Observable<BuildEvent> {
    const root = this.context.workspace.root;
    const projectRoot = resolve(root, builderConfig.root);
    const host = new virtualFs.AliasHost(this.context.host as virtualFs.Host<fs.Stats>);
    const rollupBuilder = this.createRollupBuilder({ ...this.context, host });

    const options = normalizeBuilderSchema(
      host,
      root,
      builderConfig,
    );

    return of(null).pipe(
      concatMap(() => options.deleteOutputPath
        ? this._deleteOutputDir(root, normalize(options.outputPath), this.context.host)
        : of(null)),
      concatMap(() => {
        let rollupConfig;
        try {
          rollupConfig = this.buildRollupConfig(root, projectRoot, host, options);
        } catch (e) {
          return throwError(e);
        }

        return rollupBuilder.runRollup(rollupConfig);
      }),
      concatMap(buildEvent => {
        if (buildEvent.success && !options.watch && options.serviceWorker) {
          return new Observable(obs => {
            augmentAppWithServiceWorker(
              this.context.host,
              root,
              projectRoot,
              resolve(root, normalize(options.outputPath)),
              options.baseHref || '/',
              options.ngswConfigPath,
            ).then(
              () => {
                obs.next({ success: true });
                obs.complete();
              },
              (err: Error) => {
                obs.error(err);
              },
            );
          });
        } else {
          return of(buildEvent);
        }
      }),
    );
  }

  buildRollupConfig(
    root: Path,
    projectRoot: Path,
    host: virtualFs.Host<fs.Stats>,
    options: NormalizedBrowserBuilderSchema,
  ) {
    // Ensure Build Optimizer is only used with AOT.
    if (options.buildOptimizer && !options.aot) {
      throw new Error(`The 'buildOptimizer' option cannot be used without 'aot'.`);
    }

    let rco: RollupConfigOptions<NormalizedBrowserBuilderSchema>;

    const tsConfigPath = getSystemPath(normalize(resolve(root, normalize(options.tsConfig))));
    const tsConfig = readTsconfig(tsConfigPath);

    const projectTs = requireProjectModule(getSystemPath(projectRoot), 'typescript') as typeof ts;

    const supportES2015 = tsConfig.options.target !== projectTs.ScriptTarget.ES3
      && tsConfig.options.target !== projectTs.ScriptTarget.ES5;

    rco = {
      root: getSystemPath(root),
      logger: this.context.logger,
      projectRoot: getSystemPath(projectRoot),
      buildOptions: options,
      tsConfig,
      tsConfigPath,
      supportES2015,
    };

    rco.buildOptions.progress = defaultProgress(rco.buildOptions.progress);

    const webpackConfigs: {}[] = [
      getCommonConfig(rco),
      getBrowserConfig(rco),
      getStylesConfig(rco),
      getStatsConfig(rco),
    ];

    if (rco.buildOptions.main || rco.buildOptions.polyfills) {
      const typescriptConfigPartial = rco.buildOptions.aot
        ? getAotConfig(rco, host)
        : getNonAotConfig(rco, host);
      webpackConfigs.push(typescriptConfigPartial);
    }

    const webpackConfig = webpackMerge(webpackConfigs);

    if (options.profile) {
      const smp = new SpeedMeasurePlugin({
        outputFormat: 'json',
        outputTarget: getSystemPath(join(root, 'speed-measure-plugin.json')),
      });

      return smp.wrap(webpackConfig);
    }

    return webpackConfig;
  }

  private _deleteOutputDir(root: Path, outputPath: Path, host: virtualFs.Host) {
    const resolvedOutputPath = resolve(root, outputPath);
    if (resolvedOutputPath === root) {
      throw new Error('Output path MUST not be project root directory!');
    }

    return host.exists(resolvedOutputPath).pipe(
      concatMap(exists => exists
        // TODO: remove this concat once host ops emit an event.
        ? concat(host.delete(resolvedOutputPath), of(null)).pipe(last())
        // ? of(null)
        : of(null)),
    );
  }
}

export default BrowserBuilder;

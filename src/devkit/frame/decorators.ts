import { Type } from '@angular/core';
import { TypeDecorator, makeDecorator } from '../metadata/index';
import { Repository } from '../repository/index';

import { FrameContext } from './frame_context';
export const NG_FRAME_CONTEXT = 'NgFrameContext';

/**
 * NgComponentContext
 */
export interface NgFrameContext {

  /**
   * 父Context
   */
  parent?: Type<FrameContext>;

  /**
   * 实体仓库
   */
  repository?: Type<Repository<any>>;
}

/**
 * NgViewModelDecorator
 */
export interface NgFrameContextDecorator {
  (obj?: NgFrameContext): TypeDecorator;
  new(obj?: NgFrameContext): NgFrameContext;
}

/**
 * NgComponentContext
 */
export function NgFrameContext(options: NgFrameContext) {
  const decoratorFactory = makeDecorator(NG_FRAME_CONTEXT, (obj: NgFrameContext) => obj);
  return decoratorFactory(options);
}

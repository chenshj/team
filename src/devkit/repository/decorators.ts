import { Type } from '@angular/core';
import { makeDecorator } from '../metadata/index';

export const NG_REPOSITORY = 'NgRepository';

/**
 * NgRepository
 */
export interface NgRepository {

  /**
     * API地址
     */
    apiUrl: string;

    /**
     * 实体类型
     */
    entityType: Type<any>;
}

/**
 * NgRepositoryDecorator
 */
export interface NgRepositoryDecorator {
    (obj?: NgRepository): any;
    new(obj?: NgRepository): any;
}

/**
 * NgRepository
 */
export function NgRepository(options: NgRepository) {
  const decoratorFactory = makeDecorator(NG_REPOSITORY, (obj: NgRepository) => obj);
  return decoratorFactory(options);
}

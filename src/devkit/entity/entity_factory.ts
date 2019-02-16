import { Entity } from './entity';

export function EntityFactory<T extends Entity>(T: new (...args: any[]) => any, data: any): T {
    const entity = new T(data);
    return entity;
}

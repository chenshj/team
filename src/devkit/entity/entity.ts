import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { scan, map, tap } from 'rxjs/operators';

import { isEqual } from 'lodash-es';
import { NgFieldProperty, NgListProperty, NgObjectProperty } from './field_decorator';
import { Modification, ModifyType, ChangeSet } from '../changeset/index';
import { PARENT_PATH, PARENT_CLASS } from './types';
import { EntityList } from './entity_list';
import { EntityFactory } from './entity_factory';
import { Validator, ValidationError, ValidationResult } from './validator/index';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { FieldMetadataUtil } from './field_metadata_util';
import { ValidationUtils } from './validator/validation_utils';

/**
 * @author Lucas Huang
 * 实体抽象基类，所有实体必须扩展自Entity
 *
 * ### 使用示例
 * ```
 * export class UserEntity extends Entity {
 *    userId: string;
 *    userName: string;
 *
 *    constructor(data: any){
 *        super(data);
 *    }
 * }
 * ```
 */
export abstract class Entity {

  /**
   * 验证错误集合
   */
  private validErrors = {};

  /**
   * 增量变更集合
   */
  protected changeSet = new ChangeSet();

  /**
   * 是否正在验证
   */
  protected isValidating = false;

  /**
   * 变更流
   */
  private valueChanged = new Subject<Modification>();

  /**
   * 属性值改变时触发
   *
   * ### 使用示例
   * ```
   *  const entity = new UserEntity(data);
   *  entity.onValueChanged.subscribe((data: Modification) => {
   *      console.log(data);
   *  })
   *
   * ```
   *
   * @event
   */
  onValueChanged = this.valueChanged.asObservable();

  /**
   * 原始数据
   */
  private rawData = undefined;

  /**
   * 新数据
   */
  private newData = undefined;

  /**
   * 验证器
   */
  private validator: Validator<any>;

  /**
   * @constructor
   * @param data JSON数据
   */
  constructor(data: any) {
      this.validator = new Validator();
      this.rawData = Object.assign({}, data);
      this.newData = Object.assign({}, data);
      this.onValueChanged = this.valueChanged.pipe(
          scan((x: Modification, curr: Modification) => {
              if (x) {
                  if (isEqual(x.path, curr.path) && x.type === curr.type) {
                      return Object.assign(x, curr);
                  }
                  return curr;
              }
              return curr;
          })
      );

      this.initialize();
      this.validate();
  }

  /**
   * 返回JSON格式的数据
   */
  get data(): Object {
      return this.newData;
  }

  /**
   * 验证错误集合
   */
  get errors() {
      return this.validErrors;
  }

  /**
   * 实体变更集
   */
  get changes(): Modification[] {
      return this.changeSet.changes;
  }

  /**
   * 实体主键元数据
   */
  get primaryProperty(): NgFieldProperty {
      return FieldMetadataUtil.getPrimaryFieldMetadata(this.constructor);
  }

  /**
   * 实体主键值
   */
  get primaryValue(): string {
      return this[this.primaryProperty.property].toString();
  }

  /**
   * 将变更记录保存至变更集中
   * @param value 变更记录
   */
  setChanges(value: Modification): void {
      const propertyName = value.path[value.path.length - 1];
      this.isValidating = true;
      this.validate(propertyName).pipe(
          map(error => {
              return error.errors.find(err => err.property === propertyName);
          }),
          map(error => {
              if (error) {
                  return error.constraints;
              }
              return undefined;
          })
      ).subscribe(errors => {
          this.isValidating = false;
          value.isValid = !errors;
          value.errors = errors;

          // 更新
          this.newData = Object.assign(this.newData, { [propertyName]: value.value });

          this.changeSet.append(value);
          this.valueChanged.next(value);
      });
  }

  /**
   * 校验实体各属性的值
   * @param propertyName 属性名称，如果为空，则验证实体中所有设置了验证规则的属性
   * @returns Observable<ValidationResult>
   * ### 示例
   * ```
   *  const entity = new UserEntity(data);
   *  entity.validate().subscribe(result =>{
   *      if(result.isValid){
   *          ...
   *      } else {
   *          console.log(result.message);
   *      }
   *  })
   *
   * ```
   */
  validate(propertyName?: string): Observable<ValidationResult> {
      return fromPromise(this.validator.validate(this, propertyName)).pipe(
          tap(result => {
              if (!result.isValid) {
                  this.validErrors = ValidationUtils.convertErrorsToNormalObject(result.errors, {});
              }
          })
      );
  }

  //#region 实体初始化私有方法

  /**
   * 初始化实体
   */
  private initialize() {
      const construct = this.constructor;

      const ngFields = FieldMetadataUtil.getNgFields(construct);
      const ngObjects = FieldMetadataUtil.getNgObjects(construct);
      const ngLists = FieldMetadataUtil.getNgList(construct);


      this.initializeNormalField(ngFields);
      this.initializeList(ngLists);
      this.initializeObject(ngObjects);
  }

  /**
   * 创建path
   * @param propertyName 属性名称
   */
  private createPath(propertyName: string): string[] {
      const primaryFieldMetadata = this.primaryProperty;
      const primaryDataField = primaryFieldMetadata.dataField;
      return [primaryDataField + ':' + this.primaryValue, propertyName];
  }

  /**
   * 属性字段初始化
   * @param ngFieldMetadata 属性字段元数据
   */
  private initializeNormalField(ngFieldMetadata: { [key: string]: NgFieldProperty }): void {
      Object.keys(ngFieldMetadata).forEach(propertyName => {
          const fieldMetadata = ngFieldMetadata[propertyName] as NgFieldProperty;
          const dataField = fieldMetadata.dataField || propertyName;

          if (delete this[propertyName]) {
              Object.defineProperty(this, propertyName, {
                  get: function () {
                      if (!fieldMetadata.primary) {
                          return this.data[dataField];
                      } else {
                          return this.data[dataField].toString();
                      }
                  },
                  set: function (value) {
                      const changes = {
                          path: this.createPath(propertyName),
                          value,
                          preValue: this['rawData'][dataField],
                          type: ModifyType.ValueChange
                      };

                      if (this[PARENT_PATH]) {
                          changes.path = this[PARENT_PATH].concat(changes.path);
                      }

                      this.data[dataField] = value;
                      this.setChanges(changes);
                  }
              });
          }
      });
  }

  /**
   * 初始化列表类型的元数据
   * @param ngListMetadata 列表类型元数据
   */
  private initializeList(ngListMetadata: { [key: string]: NgListProperty }): void {
      Object.keys(ngListMetadata).forEach(propertyName => {
          const fieldMetadata = ngListMetadata[propertyName] as NgListProperty;
          const path = this.createPath(propertyName);
          const dataField = fieldMetadata.dataField || propertyName;
          const val = this.data[dataField];

          const entityList = new EntityList<typeof fieldMetadata.type>();
          entityList[PARENT_CLASS] = this;
          entityList[PARENT_PATH] = path;

          if (val) {
              const entities = val.map(v => EntityFactory<typeof fieldMetadata.type>(fieldMetadata.type, v));
              entityList.loadEntities(entities);
          }

          entityList.onListChanged.subscribe(value => {
              if (value) {
                  if (entityList[PARENT_PATH][0] !== value.path[0]) {
                      value.path = entityList[PARENT_PATH].concat(value.path);
                  }
                  this.setChanges(value);
              }
          });
          this[propertyName] = entityList;
      });
  }
  /**
   * 初始化子对象
   * @param ngObjectMetadata 子对象元数据
   */
  private initializeObject(ngObjectMetadata: { [key: string]: NgObjectProperty }) {
      Object.keys(ngObjectMetadata).forEach(propertyName => {
          const fieldMetadata = ngObjectMetadata[propertyName] as NgObjectProperty;
          const path = this.createPath(propertyName);
          const dataField = fieldMetadata.dataField || propertyName;
          const val = this.data[dataField];

          const createEntityFromJsonData = (value: any) => {
              let instance;
              if (value instanceof fieldMetadata.type) {
                  instance = value;
              } else {
                  instance = EntityFactory(fieldMetadata.type, value);
              }
              instance[PARENT_CLASS] = this;
              instance[PARENT_PATH] = path;

              instance.onValueChanged.subscribe(changes => {
                  if (changes) {
                      changes.path = (this[PARENT_PATH] || []).concat(changes.path);
                      this.setChanges(changes);
                  }
              });

              return instance;
          };

          if (val) {
              let instance = createEntityFromJsonData(val);
              if (delete this[propertyName]) {
                  Object.defineProperty(this, propertyName, {
                      get: function () {
                          return instance;
                      },
                      set: function (value: any) {
                          const modifyInfo = {
                              path: instance[PARENT_PATH],
                              value: value.data,
                              preValue: this[propertyName].data,
                              type: ModifyType.ValueChange
                          };
                          instance = createEntityFromJsonData(value);
                          this.setChanges(modifyInfo);
                      }
                  });
              }
          } else {
              this[propertyName] = undefined;
          }
      });
  }

  //#endregion


  // #region 加载实体数据

  /**
   * 加载数据
   * @param data 新数据
   */
  public load(data: any) {

    this.rawData = Object.assign({}, data);
    this.newData = Object.assign({}, data);
    this.loadFields(data);
  }

  /**
   * 加载简单字段值
   * @todo 临时用修改的方式模拟
   */
  private loadFields(data: any) {
    const ngFields = FieldMetadataUtil.getNgFields(this.constructor);
    Object.keys(ngFields).forEach((propName: string) => {
      this[propName] = data[propName];
    });
  }

  private loadList(data: any) {
    throw new Error('Not Implemented');
  }

  private loadObject(data: any) {
    throw new Error('Not Implemented');
  }
  // #endregion

}

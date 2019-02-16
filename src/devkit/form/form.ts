import { Injectable } from '@angular/core';
import 'rxjs/add/operator/filter';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { MetadataUtil } from '../metadata/index';
import { BindingData, Change, ChangeType } from '../binding-data/index';

import {
  NG_FORM_CONTROL, NgFormControl,
  NG_CHILD_FORM, NgChildForm,
  NG_CHILD_FORM_ARRAY, NgChildFormArray
} from './decorators';
import {ControlValueConverter} from './control_value_converter';

/**
 * 通过Form我们可以声明式的声明一个组合表单，Form继承了FormGroup。
 * 通过NgForm注解我们可以指定与Form做数据绑定的BindingData，我们也可以不指定BindingData，仅仅将Form当做一个声明表单的工具。
 *
 * ### 定义表单
 *
 * 通过以下3个步骤，我们可以定义一个简单的表单
 * - 继承Form基类，并在构造函数中注入injector；
 * - 通过NgForm注解指定要与Form建立关联的BindingData类型；
 * - 以属性的形式声明表单中的控件（通过NgFormControl指定）、子表单（通过NgChildForm注解来指定）。
 *
 * 下面我们来定义一个员工信息编辑的一个表单，员工信息我们放在父表单中编辑，联系方式我们放在子表单中编辑，具体代码如下：。
 *
 * ``` ts
 * Injectable()
 * @NgForm({
 *  bindingData: EmpBindingData
 * )
 * class EmpForm extends Form {
 *
 *   constructor(injector: Injector) {
 *     super(injector);
 *   }
 *
 *   @NgFormControl({
 *     name: 'name',
 *     binding: 'name'
 *   })
 *   name: string;
 *
 *   @NgFormControl({
 *     name: 'dept-name',
 *     binding: 'deptInfo.name'
 *   })
 *   deptName: string;
 *
 *   @NgChildForm({
 *     name: 'contact-info',
 *     formType: ContactInfoForm
 *   })
 *   contactInfo: ContactInfoForm;
 * }
 *
 * Injectable()
 * @NgForm({
 *  bindingData: EmpBindingData
 * )
 * class ContactInfoForm extends Form {
 *
 *   constructor(injector: Injector) {
 *     super(injector);
 *   }
 *
 *   @NgFormControl({
 *     name: 'mobile',
 *     binding: 'contactInfo.mobile'
 *   })
 *   mobile: string;
 * }
 *
 * ```
 *
 * ### 表单中的注解
 *
 * 在上边的表单定义中，我们看到有三种类型的注解，结合上边的扁担，我们来详细介绍它们。
 *
 * **NgForm注解**
 *
 * - 通过该注解我们告诉框架EmpForm是一个需要通过框架扩展的表单；
 * - 通过它的的bindingData属性我们指定表单内所有控件的值来自EmpBindingData，这是可选的。
 *
 * **NgFormControl**
 *
 * - 通过该注解告诉框架创建一个FormControl对象并赋值给该属性；
 * - 通过name指定FormControl在模板中的名称，比如在模板中可以通过formControlName="dept-name"来引用deptName属性对应的FormControl；
 * - 通过binding来指定BindingData中与该FormControl做双向绑定的属性路径，它可以指定BindingData任意层级的属性，各个层级之间用点号分割，
 *   比如假设我们的BindingData中存储的是一个员工数据的集合，那么【当前员工员工信息=>联系方式=>住址信息=>街道】，
 *   binding可以这么写：contactInfo.AddressInfo.street，注意，当前员工的属性已经影射到BindingData上，不用单独再指明这一层的路径；
 * - 同时NgFormControl还可以指定Angular FormControl支持的一些配置，比如：disabled、updateOn、validators、asyncValidatorFn，
 *   具体使用方式可以参考Angular官网的文档。

 * **NgChildForm**
 * - 通过该注解我们建立父子表单之间的联系，框架内部实例化一个子表单并赋值给该属性；
 * - 通过name，我们指定子表单在模板中的名称，比如在模板中可以通过formGroupName="contact-info"来引用contactInfo属性对应的子表单；
 * - 通过formType来指定子表单的类型，以便框架能够根据这个类型找到子表单的定义，并对它进行实例化。
 *
 * ### 在模板中使用表单
 * - 通过FormGroupDirective来指定根表单；
 * - 通过FormGroupNameDirective来引用子表单；
 * - 通过FormControlName来引用控件。
 *
 * ```html
 * <form class="k-form p-2" [formGroup]="viewModel.form">
 *   <input formControlName="name"  />
 *   <input formControlName="dept-name"  />
 *   <div formGroupName="contact-info">
 *     <input formControlName="mobile"  />
 *  </div>
 * </form>
 * ```
 *
 * ### 在服务中访问表单控件
 *
 * - 首先我们要将根表单注入进服务；
 * - 通过表单属性访问控件并获取控件值；
 *
 * 比如我们要在一个服务中获取员工表单内员工的手机号码，代码如下：
 * ```
 * @Injectable()
 * class SimpleService {
 *
 *   constructor(private form: EmpForm) {}
 *
 *   search() {
 *     const mobile = this.form.contactInfo.mobile.value;
 *     console.log(mobile);
 *   }
 * }
 * ```
 */
@Injectable()
class Form extends FormGroup {

  /**
   * 上下文
   */
  protected bindingData: BindingData;

   /**
   * 结构描述：FormControl
   */
  private ngFormControls: {[propName: string]: NgFormControl};

  /**
   * 结构描述：FormGroup
   */
  private ngChildForms: {[propName: string]: NgChildForm};

  /**
   * 结构描述：FormArray
   */
  private ngChildFormArrays: {[propName: string]: NgChildFormArray};

  /**
   * 构造函数
   */
  constructor() {
    super({}, null, null);
  }

  /**
   * 初始化Form
   * @param context 上下文
   */
  public init(bindingData: BindingData) {
    this.bindingData = bindingData;
    this.buildForm();
  }

  /**
   * 构造表单
   */
  public buildForm() {
    this.collectMetadatas();
    this.createChildFormArrays();
    this.createChildForms();
    this.createControls();
  }

  /**
   * 搜集属性装饰器
   */
  private collectMetadatas() {
    this.ngFormControls = MetadataUtil.getPropsMetadatasByName(this.constructor, NG_FORM_CONTROL);
    this.ngChildForms   = MetadataUtil.getPropsMetadatasByName(this.constructor, NG_CHILD_FORM);
    this.ngChildFormArrays = MetadataUtil.getPropsMetadatasByName(this.constructor, NG_CHILD_FORM_ARRAY);
  }

  /**
   * 创建FormControl
   */
  createControls() {
    Object.keys(this.ngFormControls).forEach((propName: string) => {
      const ngFormControl = this.ngFormControls[propName];
      const control = new FormControl();
      if (ngFormControl.binding) {
        this.setUpBindingDataPipeline(control, ngFormControl.binding, ngFormControl.valueConverter);
      }
      this.controls[propName] = control;
      this[propName] = control;
    });
  }

  /**
   * 创建FormGroup
   */
  createChildForms() {
    Object.keys(this.ngChildForms).forEach((propName: string) => {
      const ngFormGroup = this.ngChildForms[propName];

      // 构造子Form
      const formGroup = new ngFormGroup.formType();
      formGroup.init(this.bindingData);

      this.controls[propName] = formGroup;
      this[propName] = formGroup;
    });
  }

  /**
   * 创建FormArray(暂不启用)
   */
  createChildFormArrays() {

    // @todo： 考虑兼容多行结构，待实现。
    // 1、此处和angular中的处理不太一样，这里是在FormArray只放了一个Form对象，类似于当前行
    //   这样的结构适合KendoUI的Grid绑定；
    // 2、Angular的FormArray，是一条记录对应一个FormGroup，对于大多数批量编辑，应该使用此模式，目前不支持；
    // 3、如果时第2种情况，bindingPath需要重新设计，目前bindingPath支持绑定任意层级，如果时列表则使用currentItem，不适用。
    Object.keys(this.ngChildFormArrays).forEach((propName: string) => {
      const ngFormArray = this.ngChildFormArrays[propName];
      if (ngFormArray.multi === true) {
        // 暂不实现
      } else {

        // 构造子Form
        const formGroup: Form = new ngFormArray.formType();
        formGroup.init(this.bindingData);

        const formArray = new FormArray([formGroup]);
        this.controls[propName] = formArray;
        this[propName] = formArray;
      }

    });
  }

  /**
   * 搭建control和table之间的通道
   * @param control 控件
   * @param bindingPath 绑定的字段名
   */
  private setUpBindingDataPipeline(control: FormControl, bindingPath: string, converter?: ControlValueConverter) {

    if (!this.bindingData) {
      throw Error('当前组件上下文中找不到BindingData，请检查！');
    }
    const bindingPaths: string[] = bindingPath.split('.');

    // 设置初始值
    const initValue = this.getValueFromBindingData(bindingPaths, converter);
    control.setValue(initValue);

    // 设置初始值

    // BindingData => control
    this.bindingData.changes.filter((change: Change) => {

      const changePath = change.path.join('.');
      if (change.type === ChangeType.ValueChanged) {

        // path完全匹配
        return changePath === bindingPath;
      } else if (change.type === ChangeType.Load || change.type === ChangeType.SelectionChanged) {

        // 对于ObjectChanged、SelectionChanged，匹配到父级
        const changePathWithDot = changePath === '' ? changePath : changePath + '.';
        return bindingPath.indexOf(changePathWithDot) === 0;

      } else {
        return false;
      }

    }).subscribe((change: Change) => {

      const value = this.bindingData.getValue(bindingPaths);
      const newControlValue = converter ? converter.convertFrom(value) : value;

      // 如果和控件上的值一样，则不再更新控件的值
      if (control.value === newControlValue) {
        return;
      }
      control.setValue(newControlValue);
    });

    // control => BindingData
    control.valueChanges.subscribe((value: any) => {
      const newBindingValue = converter ? converter.convertTo(value) : value;

      // 如果和BindingData上的值和控件最新的值一样，则不再更新BindingData
      if (this.bindingData.getValue(bindingPaths) === newBindingValue) {
        return;
      }
      this.bindingData.setValue(bindingPaths, newBindingValue, true, true);
    });
  }

  /**
   * 从BindingData中获取指定路径的值
   */
  private getValueFromBindingData(bindingPaths: string[], converter?: ControlValueConverter) {
    const value = this.bindingData.getValue(bindingPaths);
    const converteredValue = converter ? converter.convertFrom(value) : value;
    return converteredValue;
  }

}

export { Form };

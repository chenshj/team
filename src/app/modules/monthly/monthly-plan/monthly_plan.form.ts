import { Injectable, Injector } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgFormControl, Form } from '../../../../devkit';

@Injectable()
export class MonthlyPlanForm extends Form {

  /**
   * 开始日期
   */
  @NgFormControl({
    binding: 'begin',
  })
  begin: FormControl;

  /**
   * 结束日期
   */
  @NgFormControl({
    binding: 'end',
  })
  end: FormControl;
}

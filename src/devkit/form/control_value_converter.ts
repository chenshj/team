/**
 * 表单控件值转换器
 */
interface ControlValueConverter {

  /**
   * 将外部数据转换为表单控件值所需要的格式
   * @param outterValue 外部值
   * @returns {any}     表单控件所需要的值
   */
  convertFrom(outterValue: any): any;

  /**
   * 将表单控件的值转还原为外部所需要的格式
   * @param controlValue 表单控件值
   * @returns {any}      外部所需要的值
   */
  convertTo(controlValue: any): any;
}

export { ControlValueConverter };

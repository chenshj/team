import { Directive, OnInit, OnChanges, SimpleChanges, Input, HostListener, HostBinding } from '@angular/core';
import { GridComponent, GridDataResult, DataBindingDirective, SelectionDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
import { BindingData, BindingList, Change, ChangeType, Form } from '../devkit';


/**
 * Kendo Grid 数据绑定指令
 *
 * TODO: 整体刷新，性能问题
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[farrisGridBinding]',
})
class KendoGridBindingDirective extends DataBindingDirective implements OnInit, OnChanges {

  /**
   * 数据列表
   */
  private list: BindingList;

  /**
   * 数据绑定
   */
  @Input('farrisGridBinding')
  public set bindingData(value: BindingData | BindingList) {
    this.list = (value instanceof BindingData) ? value.list : value;
  }

  /**
   * 是否允许编辑
   */
  @Input()
  public editable = false;

  /**
   * 编辑时绑定的表单
   */
  @Input()
  public form: Form;

  /**
   * 构造函数
   * @param grid 宿主Grid
   */
  constructor(public grid: GridComponent, private selectionDir: SelectionDirective) {
    super(grid);
  }

  /**
   * 指令初始化后
   */
  ngOnInit() {
    super.ngOnInit();
    if (this.editable === true && this.form === null) {
      throw Error('启用编辑时，必须指定form');
    }
  }

  /**
   * 指令输入变更处理
   */
  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    this.bindData();

    this.list.changes.filter((change: Change) => {
      const changeType = change.type;
      return changeType === ChangeType.Load || changeType === ChangeType.Append ||
        changeType === ChangeType.Remove || changeType === ChangeType.ValueChanged;
    }).subscribe((change: Change) => {
      this.bindData();
    });
  }

  /**
   * 绑定data到宿主grid上
   */
  private bindData() {
    this.grid.data = process(this.list.toJSON(), {});
    this.initSelections();
  }

  process(state) {
    const rawData = (this.originalData instanceof BindingData) ? this.originalData.list.toJSON() : this.originalData;
    return process(rawData, state);
  }
  /**
   * 重置选中行
   */
  private initSelections() {
    const selectedKeys = this.selectionDir.selectedKeys;
    // selectedKeys.splice(0, selectedKeys.length);

    // 如果有选中行，则保持不变，如果没有，则默认选中当前行
    if (selectedKeys.length !== 0) {
      return;
    }
    const currentId = this.list[this.list.primaryKey];
    if (currentId) {
      selectedKeys.push(currentId);
    }
  }

  /**
   * 处理Grid行切换事件
   * @param event 行切换事件对象
   */
  @HostListener('selectionChange', ['$event'])
  public selectionChangeHandler(event: any) {
    const selectedRows = event.selectedRows;
    let currentId = null;
    if (selectedRows.length !== 0) {
      currentId = this.getCurrentIdFromGrid(selectedRows[selectedRows.length - 1].dataItem);
    }
    this.setCurrentIdToData(currentId);
  }

  /**
   * 单元格点击处理
   * @param event 单元格单击事件对象
   */
  @HostListener('cellClick', ['$event'])
  public cellClickHandler(event: any) {
    if (this.editable === false) {
      return;
    }

    const sender = event.sender;
    const rowIndex = event.rowIndex;
    const columnIndex = event.columnIndex;
    sender.editCell(rowIndex, columnIndex, this.form);
  }

  /**
   * 单元格结束编辑处理
   * @param event 单元格结束编辑事件对象
   */
  @HostListener('cellClose', ['$event'])
  public cellCloseHandler(event: any) {
    if (this.editable === false) {
      return;
    }
    this.bindData();
  }

  /**
   * 获取Grid上的当前行内码
   * @param dataItem 行数据
   */
  private getCurrentIdFromGrid(dataItem: any) {
    const primaryKey = this.list.primaryKey;
    return dataItem[primaryKey];
  }

  /**
   * 设置BindingList的当前行
   * @param id 当前行内码
   */
  private setCurrentIdToData(id: string): void {
    this.list.setCurrentId(id, true);
  }
}

export { KendoGridBindingDirective };

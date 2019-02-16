import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MonthlyPlanForm } from './monthly_plan.form';
import { MonthlyPlanUIState } from './monthly_plan.uistate';

@Injectable()
class SaleOrderListService {

  constructor(
    private uiState: MonthlyPlanUIState,
    private form: MonthlyPlanForm,
    private router: Router
  ) {
  }

  load() {
    // this.dataService.loadData();
  }

  search() {
    // const begin = this.form.begin.value ? moment(this.form.begin.value).format('YYYY-MM-DD') : '';
    // const end   = this.form.end.value   ? moment(this.form.end.value).format('YYYY-MM-DD') : '';
    // this.dataService.search(begin, end);
  }

  remove() {
    // const dataIds = this.uiState.selectedIds;
    // if (dataIds.length === 0) {
    //   alert('请选择要删除的订单');
    // }
    // this.dataService.remove(dataIds);
  }

  route(action: string) {
    // const ddnm = (action === 'add') ? 'new' : this.bindingData['DDNM'];
    // this.router.navigate(['orders', ddnm, { action }]);
  }
}

export { SaleOrderListService };

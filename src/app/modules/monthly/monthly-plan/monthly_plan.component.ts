import { Component, OnInit, Injector } from '@angular/core';
import { MonthlyPlanViewModel } from './monthly_plan.viewmodel';
import { MONTHLY_PLAN_FRAME_PROVIDERS } from './monthly_plan.providers';
import { FrameComponent } from '../../../../devkit';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-monthlyplan',
  templateUrl: './monthly_plan.component.html',
  styleUrls: ['./monthly_plan.component.css'],
  providers: MONTHLY_PLAN_FRAME_PROVIDERS
})
export class MonthlyPlanComponent extends FrameComponent implements OnInit {

  showFilter = true;

  viewModel: MonthlyPlanViewModel;

  toggleFilter() {
    this.showFilter = !this.showFilter;
    console.log(this.showFilter);
  }

  constructor(injector: Injector, private httpClient: HttpClient) {
    super(injector);
  }

  ngOnInit() {
    this.viewModel.loadData();
    // const url = 'http://localhost:4200/assets/monthly_plan.json';
    // return this.httpClient.get(url).subscribe();
  }

}

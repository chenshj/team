import { Component, OnInit, Compiler } from '@angular/core';
import { ApplicationService } from 'app-common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title = 'dashboard';
  constructor(private applicationService: ApplicationService) { }

  ngOnInit() {
  }

  openMonthlyObjective() {
    this.applicationService.open('objective', 'objective');
  }

  openWorkPlans() {
    this.applicationService.open('plan', 'plan');
  }

  openWeeklyReport() {
    this.applicationService.open('progress', 'progress');
  }
}

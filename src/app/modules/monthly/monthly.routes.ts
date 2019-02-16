import { Routes, RouterModule } from '@angular/router';
import { MonthlyPlanComponent } from './monthly-plan/monthly_plan.component';
import { MonthlyPlanDetailComponent } from './monthlyplandetail/monthlyplandetail.component';

const routes: Routes = [
  { path: '', component: MonthlyPlanComponent },
  { path: 'details', component: MonthlyPlanDetailComponent }
];

export const MonthlyRoots = RouterModule.forChild(routes);

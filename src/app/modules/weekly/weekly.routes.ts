import { Routes, RouterModule } from '@angular/router';
import { WeeklyPlanComponent } from './weeklyplan/weeklyplan.component';
import { WeeklyPlanDetailComponent } from './weeklyplandetail/weeklyplandetail.component';

const routes: Routes = [
  { path: '', component: WeeklyPlanComponent },
  { path: 'details', component: WeeklyPlanDetailComponent }
];

export const WeeklyRoots = RouterModule.forChild(routes);

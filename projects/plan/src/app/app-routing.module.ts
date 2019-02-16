import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlansComponent } from './plans/plans.component';
import { PlanDetailComponent } from './plan-detail/plan-detail.component';

const routes: Routes = [
  { path: '', component: PlansComponent },
  { path: 'detail', component: PlanDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

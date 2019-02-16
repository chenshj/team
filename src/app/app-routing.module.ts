import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './home/dashboard/dashboard.component';

const routes: Routes = [
  // { path: '', component: DashboardComponent },
  { path: '', loadChildren: './home/home.module#HomeModule' },
  { path: 'monthly', loadChildren: './modules/monthly/monthly.module#MonthlyModule' },
  { path: 'weekly', loadChildren: './modules/weekly/weekly.module#WeeklyModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

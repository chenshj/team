import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObjectivesComponent } from './objectives/objectives.component';
import { ObjectiveDetailComponent } from './objective-detail/objective-detail.component';

const routes: Routes = [
  { path: '', component: ObjectivesComponent },
  { path: 'detail', component: ObjectiveDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

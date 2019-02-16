import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContainerComponent } from './container/container.component';

const routes: Routes = [
    { path: '', component: ContainerComponent},
];

export const HomeRoots = RouterModule.forChild(routes);

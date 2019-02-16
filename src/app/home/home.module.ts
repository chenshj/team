import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from '../../ui/tabs';
import { HomeRoots } from './home.routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContainerComponent } from './container/container.component';
import { FrameComponent } from './frame/frame.component';
import { FrameDirective } from './frame/frame.directive';

@NgModule({
  imports: [
    CommonModule,
    TabsModule.forRoot(),
    HomeRoots
  ],
  declarations: [DashboardComponent, ContainerComponent, FrameComponent, FrameDirective],
  entryComponents: [DashboardComponent, ContainerComponent]
})
export class HomeModule {
  static entry = ContainerComponent;
}

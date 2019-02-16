import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TopnavbarComponent } from './topnavbar/topnavbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule, RouterModule
  ],
  exports: [
    TopnavbarComponent
  ],
  declarations: [LayoutComponent, NavigationComponent, TopnavbarComponent, FooterComponent]
})
export class FrameworkModule { }

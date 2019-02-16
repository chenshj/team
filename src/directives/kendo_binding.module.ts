import { NgModule } from '@angular/core';
import { KendoGridBindingDirective } from './kendo_grid_binding.directive';

@NgModule({
  declarations: [ KendoGridBindingDirective ],
  providers: [],
  exports: [ KendoGridBindingDirective ]
})
export class KendoBindingModule {
}

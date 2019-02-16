import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { WindowModule } from '@progress/kendo-angular-dialog';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { WeeklyRoots } from './weekly.routes';
import { WeeklyPlanComponent } from './weeklyplan/weeklyplan.component';
import { WeeklyPlanDetailComponent } from './weeklyplandetail/weeklyplandetail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ButtonsModule,
    GridModule,
    InputsModule,
    LabelModule,
    LayoutModule,
    DropDownsModule,
    WindowModule,
    DatePickerModule,
    WeeklyRoots
  ],
  declarations: [WeeklyPlanComponent, WeeklyPlanDetailComponent],
  entryComponents: [WeeklyPlanComponent]
})
export class WeeklyModule {
  static entry = WeeklyPlanComponent;
}

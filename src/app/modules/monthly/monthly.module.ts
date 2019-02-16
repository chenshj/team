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
import { DatePickerModule, DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { RestfulService } from '../../../devkit';
import { FARRIS_DEVKIT_APP_PROVIDERS } from '../../../devkit';
import { KendoBindingModule } from '../../../directives';
import { MonthlyRoots } from './monthly.routes';
import { MonthlyPlanComponent } from './monthly-plan/monthly_plan.component';
import { MonthlyPlanDetailComponent } from './monthlyplandetail/monthlyplandetail.component';
import { MonthlyPlanForm } from './monthly-plan/monthly_plan.form';
import { MonthlyPlanStateMachine } from './monthly-plan/monthly_plan.statemachine';
import { MonthlyPlanUIState } from './monthly-plan/monthly_plan.uistate';
import { MonthlyPlanViewModel } from './monthly-plan/monthly_plan.viewmodel';
import { MonthlyPlanRepository } from './entities/monthly_plan.repository';
import { MODEL_PROVIDERS } from './entities/monthly_plan.entity.provider';

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
    DateInputsModule,
    MonthlyRoots,
    KendoBindingModule
  ],
  declarations: [MonthlyPlanComponent, MonthlyPlanDetailComponent],
  providers: [
    RestfulService,
    MonthlyPlanForm,
    MonthlyPlanStateMachine,
    MonthlyPlanUIState,
    MonthlyPlanViewModel,
    MonthlyPlanRepository,
    MODEL_PROVIDERS,
    FARRIS_DEVKIT_APP_PROVIDERS
  ],
  entryComponents: [MonthlyPlanComponent]
})
export class MonthlyModule {
  static entry = MonthlyPlanComponent;
}

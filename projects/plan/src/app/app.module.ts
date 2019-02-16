import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { CalendarModule } from '@progress/kendo-angular-dateinputs';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { LayoutModule, PanelBarModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PlansComponent } from './plans/plans.component';
import { PlanDetailComponent } from './plan-detail/plan-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    PlansComponent,
    PlanDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule,
    CalendarModule,
    GridModule,
    InputsModule,
    LabelModule,
    LayoutModule,
    DropDownsModule,
    PanelBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Provider } from '@angular/core';
import { BE_SERVER_URI_TOKEN } from '../../../../farris-bef';
import { MonthlyPlanRepository } from './monthly_plan.repository';
import { MonthlyPlan } from './monthly_plan.entity';

const MODEL_PROVIDERS: Provider[] = [
  MonthlyPlanRepository,
  { provide: BE_SERVER_URI_TOKEN, useValue: 'http://localhost:4200' }
];

export { MonthlyPlan, MonthlyPlanRepository, MODEL_PROVIDERS };

import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgRepository } from '../../../../devkit';
import { MonthlyPlan } from './monthly_plan.entity';
import { BefRepository, BE_SERVER_URI_TOKEN } from '../../../../farris-bef';

@Injectable()
@NgRepository({
  apiUrl: 'assets/monthly_plan.json',
  entityType: MonthlyPlan
})
export class MonthlyPlanRepository extends BefRepository<MonthlyPlan> {
  constructor(httpClient: HttpClient, @Inject(BE_SERVER_URI_TOKEN) serverUri) {
    super(httpClient, serverUri);
  }
}

import {
  Repository, BindingData, UIState, StateMachine,
  ViewModel, FARRIS_DEVKIT_FRAME_PROVIDERS, FRAME_ID
} from '../../../../devkit';
import { FARRIS_COMMAND_SERVICE_PROVIDERS } from '../../../../farris-command-services';

import { MonthlyPlanRepository } from '../entities/monthly_plan.repository';
import { MonthlyPlanUIState } from './monthly_plan.uistate';
import { MonthlyPlanStateMachine } from './monthly_plan.statemachine';
import { MonthlyPlanViewModel } from './monthly_plan.viewmodel';
import { COMMAND_HANDLER_PROVIDERS } from './monthly_plan.handlers';

const MONTHLY_PLAN_FRAME_PROVIDERS = [
  FARRIS_DEVKIT_FRAME_PROVIDERS,
  FARRIS_COMMAND_SERVICE_PROVIDERS,
  COMMAND_HANDLER_PROVIDERS,
  { provide: FRAME_ID, useValue: 'form-frame' },
  { provide: Repository, useExisting: MonthlyPlanRepository },
  { provide: BindingData, useClass: BindingData },
  { provide: UIState, useClass: MonthlyPlanUIState },
  { provide: StateMachine, useClass: MonthlyPlanStateMachine },
  { provide: ViewModel, useClass: MonthlyPlanViewModel },
];

export { MONTHLY_PLAN_FRAME_PROVIDERS };

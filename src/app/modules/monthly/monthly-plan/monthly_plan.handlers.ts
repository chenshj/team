import { Provider } from '@angular/core';
import { COMMAND_HANDLERS_TOKEN } from '../../../../devkit';
import { LoadDataHandler } from './monthly_plan.loaddata.handler';

export const COMMAND_HANDLER_PROVIDERS: Provider[] = [
  { provide: COMMAND_HANDLERS_TOKEN, useClass: LoadDataHandler, multi: true },
];

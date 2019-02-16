import { Provider } from '@angular/core';
import { FormLoadingService } from './form-loading.service';
import { FormMessageService } from './form-message.service';
import { FormNotifyService } from './form-notify.service';
import { CheckService } from './check.service';

import { EventService } from './event.service';
import { RouterService } from './router.service';
import { UIStateService } from './ui-state.service';
import { StateMachineService } from './state-machine.service';
import { ValidationService } from './validation.service';
import {
  ListRepositoryService,
  CardRepositoryService,
  ChildListRepositoryService
} from './repository-services/index';
import { BindingDataService } from './binding-data.service';

const FARRIS_COMMAND_SERVICE_PROVIDERS: Provider[] = [
  FormLoadingService,
  FormMessageService,
  FormNotifyService,
  CheckService,
  RouterService,

  EventService,
  UIStateService,
  StateMachineService,
  BindingDataService,
  ValidationService,

  ListRepositoryService,
  CardRepositoryService,
  ChildListRepositoryService,

];

export {
  FormLoadingService,
  FormMessageService,
  FormNotifyService,
  CheckService,
  RouterService,

  EventService,
  UIStateService,
  StateMachineService,
  ValidationService,
  BindingDataService,

  ListRepositoryService,
  CardRepositoryService,
  ChildListRepositoryService,

  FARRIS_COMMAND_SERVICE_PROVIDERS
};




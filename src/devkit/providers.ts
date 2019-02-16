import { Provider } from '@angular/core';
import { VARIABLE_PROVIDERS } from './variable/index';
import { AppContext } from './context/index';
import { RestfulService } from './http-service/index';

import { COMMAND_PROVIDERS } from './command/index';
import { FrameContext, FrameEventBus } from './frame/index';

// 应用Providers
export const FARRIS_DEVKIT_APP_PROVIDERS: Provider[] = [
  AppContext,
  RestfulService,
  FrameEventBus,
  VARIABLE_PROVIDERS
];

// 框架Providers
export const FARRIS_DEVKIT_FRAME_PROVIDERS: Provider[] = [
  COMMAND_PROVIDERS,
  FrameContext
];

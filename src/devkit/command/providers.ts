import { CommandHandlerRegistry } from './command_handler_registry';
import { CommandHandlerExtenderRegistry } from './command_handler_extender_registry';
import { CommandHandlerFactory } from './command_handler_factory';
import { CommandBus } from './command_bus';


export const COMMAND_PROVIDERS = [
  CommandHandlerRegistry,
  CommandHandlerExtenderRegistry,
  CommandHandlerFactory,
  CommandBus,
];

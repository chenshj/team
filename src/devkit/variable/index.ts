import { Provider } from '@angular/core';

import { VariableParser, VARIABLE_PARSERS } from './variable_parser';
import { DataVariableParser } from './data_variable_parser';
import { UIStateVariableParser } from './ui_state_variable_parser';
import { CommandVariableParser } from './command_variable_parser';
import { VariableParseService } from './variable_parse_service';

// Providers
const VARIABLE_PROVIDERS: Provider[] = [
  { provide: VARIABLE_PARSERS, multi: true, useClass: DataVariableParser },
  { provide: VARIABLE_PARSERS, multi: true, useClass: UIStateVariableParser },
  { provide: VARIABLE_PARSERS, multi: true, useClass: CommandVariableParser },
  VariableParseService
];

export {
  VariableParser, VARIABLE_PARSERS,
  DataVariableParser, UIStateVariableParser, CommandVariableParser,
  VariableParseService, VARIABLE_PROVIDERS
};

import { InitApplicationSetup } from './console/commands';
import { HttpExplorer } from './http';
import { BaseValidator, ExistsConstraint } from './validator';
import { IsUniqueConstraint } from './validator/decorators/isUnique';
import { IsValueFromConfigConstraint } from './validator/decorators/isValueFromConfig';

const providers = [
  // commands
  InitApplicationSetup,

  // custom base validator
  BaseValidator,

  // http providers
  HttpExplorer,

  // custom validator decorators
  IsUniqueConstraint,
  ExistsConstraint,
  IsValueFromConfigConstraint,
];

const getProviders = function (): any {
  return providers;
};

export { getProviders };

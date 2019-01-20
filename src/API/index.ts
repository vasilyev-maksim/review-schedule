import { EnvironmentVariable } from '../enums';
import { getEnvironmentVariableValue } from '../utils';
import { APIImpl } from './API.impl';
import { APIMock } from './API.mock';

export const API = getEnvironmentVariableValue(EnvironmentVariable.Mock)
    ? APIMock
    : APIImpl;

import { getEnvironment } from '../environment';
import { APIImpl } from './API.impl';
import { APIMock } from './API.mock';

export const API = getEnvironment().mockAPI
    ? APIMock
    : APIImpl;

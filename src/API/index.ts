import { environment } from '../environment';
import { APIImpl } from './API.impl';
import { APIMock } from './API.mock';

export const API = environment.mockAPI
    ? APIMock
    : APIImpl;

import { APIImpl } from './API.impl';
import { APIMock } from './API.mock';

export const API = process.env.MOCK
    ? APIMock
    : APIImpl;

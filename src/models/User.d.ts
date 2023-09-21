import { DateTime } from '@themost/jspa';
import { Account } from './Account';

export class User extends Account {
    enabled: boolean;
    logonCount?: number;
    lastLogon?: DateTime;
    groups?: Account[];
}
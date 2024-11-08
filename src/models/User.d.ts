import { Account } from './Account';

export declare class User extends Account {
    enabled?: boolean;
    logonCount?: number;
    lockoutTime?: Date;
    lastLogon?: Date;
    groups?: Account[];
}

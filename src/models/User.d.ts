import { Account } from './Account';

export declare class User extends Account {
    enabled?: boolean;
    logonCount?: number;
    lastLogon?: Date;
    groups?: Account[];
}

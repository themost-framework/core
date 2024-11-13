import { HasParentJunction } from '@themost/data';
import { Account } from './Account';

export declare class User extends Account {
    enabled?: boolean;
    logonCount?: number;
    lockoutTime?: Date;
    lastLogon?: Date;
    groups?: Account[];
    /**
     * @description Gets a queryable collection of groups that this user belongs to
     */
    groupCollection: HasParentJunction
}

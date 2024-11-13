import { DataObjectJunction } from '@themost/data';
import { Account } from './Account';

export declare class Group extends Account {
    members?: Account[];
    /**
     * @description Gets a queryable collection of members that belong to this group
     */
    memberCollection: DataObjectJunction;
}
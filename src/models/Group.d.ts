import { Account } from './Account';

export declare class Group extends Account {
    members?: Account[];
    addUserAsync(user: Account): Promise<boolean>;
    removeUserAsync(user: Account): Promise<boolean>;
}
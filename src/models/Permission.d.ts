import { DataObject } from '@themost/data';
import { Account } from './Account';
import { Workspace } from './Workspace';

export declare class Permission extends DataObject {
    id?: number;
    privilege?: string;
    parentPrivilege?: string;
    account?: Account | number;
    target?: string;
    workspace?: Workspace | number;
    dateCreated?: string;
    dateModified?: string;
    createdBy?: Account | number;
    modifiedBy?: Account | number;
}

import { DataObject } from '@themost/data';

export declare class Thing extends DataObject {
    id?: number;
    name?: string;
    alternateName?: string;
    description?: string;
    additionalType?: string;
    sameAs?: string;
    url?: string;
    identifier?: string;
    image?: string;
    dateCreated?: string;
    dateModified?: string;
    createdBy?: any | number;
    modifiedBy?: any | number;
}
import { enumerable } from '@themost/client';
import { Account } from './Account';
import {EdmMapping} from '@themost/data';

@EdmMapping.entityType()
class Group extends Account {
    constructor() {
        super();
    }

    /**
     * Gets a queryable collection of members that belong to this group
     * @returns {import('@themost/data').DataObjectJunction}
     */
    @enumerable(false)
    get memberCollection() {
        return this.property('members');
    }

}

export {
    Group
}

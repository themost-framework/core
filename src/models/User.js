import {EdmMapping} from '@themost/data';
import {Account} from './Account';
import { enumerable } from '@themost/client';

@EdmMapping.entityType()
class User extends Account {
    constructor() {
        super();
    }

    /**
     * Gets a queryable collection of groups that this user belongs to
     * @returns {import('@themost/data').HasParentJunction}
     */
    @enumerable(false)
    get groupCollection() {
        return this.property('groups');
    }

}

export {
    User
}

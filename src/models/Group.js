import { Account } from './Account';
import {EdmMapping} from '@themost/data';

@EdmMapping.entityType()
class Group extends Account {
    constructor() {
        super();
    }

    /**
     * Add user to group
     * @param {Account} user 
     * @returns {Promise<boolean>}
     */
    async addUserAsync(user) {
        /**
         * @type {import('@themost/data').DataObjectJunction}   
         */
        const members = this.property('members');
        const res = await members.insert(user);
        return res != null;
    }

    /**
     * Remove user from group
     * @param {Account} user 
     */
    async removeUserAsync(user) {
        /**
         * @type {import('@themost/data').DataObjectJunction}   
         */
        const members = this.property('members');
        const res = await members.remove(user);
        return res != null;
    }

}

export {
    Group
}

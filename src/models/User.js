import {EdmMapping} from '@themost/data';
import {Account} from './Account';

@EdmMapping.entityType()
class User extends Account {
    constructor() {
        super();
    }
}

export {
    User
}

import { Account } from './Account';
import {EdmMapping} from '@themost/data';

@EdmMapping.entityType()
class Group extends Account {
    constructor() {
        super();
    }
}

export {
    Group
}

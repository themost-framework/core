import {DataObject, EdmMapping} from '@themost/data';

@EdmMapping.entityType()
class Permission extends DataObject {
    constructor() {
        super();
    }
}

export {
    Permission
}

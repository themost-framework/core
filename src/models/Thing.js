import {DataObject, EdmMapping} from '@themost/data';

@EdmMapping.entityType()
class Thing extends DataObject {

    constructor() {
        super();
    }

}

export {
    Thing
}

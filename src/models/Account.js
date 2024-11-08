import { Thing } from './Thing';
import { EdmMapping } from '@themost/data'

@EdmMapping.entityType()
class Account extends Thing {
    constructor() {
        super();
    }
}

export {
    Account
}

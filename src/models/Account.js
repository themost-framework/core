import { Thing } from './Thing';
import { EdmMapping } from '@themost/data'

const AccountType  = {
    User: 0,
    Group: 1
}

@EdmMapping.entityType()
class Account extends Thing {
    constructor() {
        super();
    }
}

export {
    AccountType,
    Account
}

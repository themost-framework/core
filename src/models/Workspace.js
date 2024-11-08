import { Thing } from './Thing';
import {EdmMapping} from '@themost/data';

@EdmMapping.entityType()
class Workspace extends Thing {
   constructor() {
       super();
   }
}

export {
    Workspace
}

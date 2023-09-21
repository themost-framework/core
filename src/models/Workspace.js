import { Entity } from '@themost/jspa';
import { Thing } from './Thing';

@Entity({
    privileges: [
        {
            "mask": 1,
            "type": "global",
            "account": "*"
        },
        {
            "mask": 15,
            "type": "global"
        },
        {
            "mask": 15,
            "type": "global",
            "account": "Administrators"
        }
    ]
})
@Table({
    indexes: [
        {
            columnList: [ 'alternateName' ]
        }
    ]
})
class Workspace extends Thing {
   constructor() {
       super();
   }

   // noinspection JSUnusedLocalSymbols
   @PostInit()
   async onPostInit(event) {
       const count = await event.model.asQueryable().silent().count();
       if (count) {
           return;
       }
       await event.model.silent().save([
           {
               name: 'Root Workspace',
               alternateName: 'root'
           }
       ]);
   }

}

export {
    Workspace
}

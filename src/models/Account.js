import {  Column, ColumnType, Entity, Table } from '@themost/jspa';
import { Thing } from './Thing';

const AccountType  = {
    User: 0,
    Group: 1
}

@Entity({
    privileges: [
        {
          "mask": 15,
          "type": "global"
        },
        {
          "mask": 15,
          "type": "global",
          "account": "Administrators"
        },
        {
          "mask": 1,
          "type": "self",
          "filter": "id eq me()"
        }
      ]
})
@Table({
    indexes: [
        {
            columnList: [ 'name' ]
        }
    ],
    uniqueConstraints: [
        {
            columnNames: [ 'name' ]
        }
    ]
})
class Account extends Thing {
    @Column({
        nullable: false,
        type: ColumnType.Integer
    })
    accountType;
    @Column({
        nullable: false,
        type: ColumnType.Text
    })
    name;
}

export {
    AccountType,
    Account
}

import { CascadeType, Column, ColumnType, Entity, EntityListeners, FetchType, Formula, JoinTable, ManyToMany, PostInit, PostInitEvent, PostLoad } from '@themost/jspa';
import { Account, AccountType } from './Account';

@Entity()
@EntityListeners()
class User extends Account {
    @Column({
        nullable: false,
        updatable: false,
        insertable: true,
        type: ColumnType.Integer
    })
    @Formula(() => AccountType.User)
    accountType = AccountType.User;

    @Column({
        nullable: false,
        type: ColumnType.Boolean
    })
    @Formula(() => true)
    enabled;

    @Column({
        nullable: true,
        type: ColumnType.Integer
    })
    logonCount;

    @Column({
        nullable: true,
        type: ColumnType.DateTime
    })
    lastLogon;

    @ManyToMany({
        targetEntity: 'Group',
        cascadeType: CascadeType.Detach,
        fetchType: FetchType.Lazy
    })
    @JoinTable({
        name: 'GroupMembers',
        joinColumns: [
            {
                name: 'object',
                referencedColumnName: 'id'
            }
        ],
        inverseJoinColumns: [
            {
                name: 'value',
                referencedColumnName: 'id'
            }
        ]
    })
    groups;

    @PostLoad()
    async onPostLoad() {
        //
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
                name: 'anonymous',
                alternateName: 'anonymous',
                accountType: AccountType.User,
                groups: [
                    {
                        name: 'Guests'
                    }
                ]
            }
        ]);
    }

}

export {
    User
}

import { Column, ColumnType, Entity, FetchType, Formula, GeneratedValue, GenerationType, Id, ManyToOne } from '@themost/jspa';

@Entity({
    privileges: [
        {
            "mask": 15,
            "type": "global"
        }
    ]
})
class Permission {
    @Id()
    @Column({
        type: 'Counter'
    })
    @GeneratedValue({
        strategy: GenerationType.Identity
    })
    id;

    @Column({
        nullable: false,
        type: ColumnType.Text,

    })
    privilege;

    @Column({
        type: ColumnType.Text,
    })
    parentPrivilege;

    @Column({
        nullable: false,
        type: 'Account'
    })
    account;

    @Column({
        nullable: false,
        type: ColumnType.Text
    })
    target;

    @Column({
        nullable: false,
        type: ColumnType.Integer
    })
    mask;

    @Column({
        nullable: false,
        type: 'Workspace'
    })
    workspace;

    @Column({
        nullable: false,
        updatable: false,
        type: ColumnType.DateTime
    })
    @Formula(() => {
        return new Date();
    })
    dateCreated;

    @Column({
        nullable: false,
        type: ColumnType.DateTime
    })
    @Formula(() => {
        return new Date();
    })
    dateModified;

    @Column({
        nullable: false,
        updatable: false,
        type: 'User'
    })
    @ManyToOne({
        fetchType: FetchType.Lazy
    })
    createdBy;

    @Column({
        nullable: false,
        type: 'User'
    })
    @ManyToOne({
        fetchType: FetchType.Lazy
    })
    modifiedBy;

    // noinspection JSUnusedLocalSymbols
    @PostInit()
    async onPostInit(event) {
        const count = await event.model.asQueryable().silent().count();
        if (count) {
            return;
        }
        await event.model.silent().save([
            {
                privilege: "Permission",
                account: {
                    name: "Administrators"
                },
                target: "0",
                workspace: {
                    alternateName: 'root'
                }
            }
        ]);
    }

}

export {
    Permission
}

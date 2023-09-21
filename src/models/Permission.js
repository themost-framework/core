import { Basic, Column, ColumnType, Counter, Entity, FetchType, Formula, GeneratedValue, GenerationType, Id, ManyToOne } from '@themost/jspa';
import { Account } from './Account';
import { User } from './User';
import { Workspace } from './Workspace';

@Entity()
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
}

export {
    Permission
}

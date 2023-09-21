import { DataObject } from '@themost/data';
import { Column, Entity, GeneratedValue, GenerationType, Id, Table, Counter, Basic, Formula, ManyToOne, FetchType, ColumnDefault, ColumnType, Embeddable } from '@themost/jspa';

@Entity({
    abstract: true
})
@Table()
class Thing extends DataObject {

    constructor() {
        super();
    }

    @Id()
    @Column({
        type: 'Counter'
    })
    @GeneratedValue({
        strategy: GenerationType.Identity
    })
    id;

    @Column({
        type: ColumnType.Text
    })
    name;

    @Column({
        type: ColumnType.Text
    })
    alternateName;

    @Column({
        type: ColumnType.Text
    })
    description;

    @Column({
        type: ColumnType.Text,
        insertable: true,
        updatable: false
    })
    @Formula((event) => {
        if (typeof event.target.getSuperModel === 'function') {
            return event.target.getSuperModel().name;
        }
        return event.model.name;
    })
    additionalType;

    @Column({
        type: ColumnType.Text
    })
    sameAs;

    @Column({
        type: ColumnType.Text
    })
    url;

    @Column({
        type: ColumnType.Text
    })
    identifier;

    @Column({
        type: ColumnType.Text
    })
    image;

    @Column({
        nullable: false,
        updatable: false,
        type: ColumnType.DateTime
    })
    @ColumnDefault(() => new Date())
    dateCreated;

    @Column({
        nullable: false,
        type: ColumnType.DateTime
    })
    @Formula(() => new Date())
    dateModified;

    @Column({
        nullable: true,
        updatable: false,
        type: 'User'
    })
    @ManyToOne({
        fetchType: FetchType.Lazy
    })
    @Formula((event) => {
        const context = event.context;
        let user = context.interactiveUser;
        if (user && user.name) {
            return {
                name: user.name
            };
        }
        user = context.user;
        if (user && user.name) {
            return {
                name: user.name
            };
        }
        return null;
    })
    createdBy;

    @Column({
        nullable: true,
        type: 'User'
    })
    @ManyToOne({
        fetchType: FetchType.Lazy
    })
    @Formula((event) => {
        const context = event.context;
        let user = context.interactiveUser;
        if (user && user.name) {
            return {
                name: user.name
            };
        }
        user = context.user;
        if (user && user.name) {
            return {
                name: user.name
            };
        }
        return null;
    })
    modifiedBy;
}

export {
    Thing
}
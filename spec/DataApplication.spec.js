import { SchemaLoaderStrategy } from '@themost/data';
import { User, Group } from '@themost/core';
import { TestUtils } from './TestUtils';
import {TestApplication} from './TestApplication';

describe('DataApplication', () => {

    /**
     * @type {import('@themost/data').DataContext}
     */
    let context;
    /**
     * @type {TestApplication}
     */
    let app;
    beforeAll(async () => {
        app = new TestApplication();
        context = app.createContext();
    });

    afterAll(async () => {
        if (context) {
            await context.finalizeAsync();
        }
        if (app) {
            await app.finalizeAsync();
        }

    });

    it('should get schema', () => {
        const schemaLoader = context.getConfiguration().getStrategy(SchemaLoaderStrategy);
        [
            'Thing',
            'Account',
            'User',
            'Group',
            'Permission',
            'Workspace'
        ].forEach((name) => {
            const schema = schemaLoader.getModelDefinition(name);
            expect(schema).toBeTruthy();
        });
    });

    it('should create user', async () => {
        await TestUtils.executeInTransaction(context, async () => {
            await context.model(User).silent().save({
                name: 'alexis.rees@example.com',
                groups: [
                    {
                        name: 'Administrators'
                    }
                ]
            });
            /**
             * @type {import('@themost/core').User}
             */
            const item = await context.model(User).where(
                (x) => x.name === 'alexis.rees@example.com'
            ).expand((x) => x.groups).silent().getItem();
            expect(item).toBeTruthy();
            expect(item.groups.length).toBeTruthy();
            const firstGroup = item.groups[0];
            expect(firstGroup.name).toEqual('Administrators');
        });
    });

    it('should fail to update user', async () => {
        await TestUtils.executeInTransaction(context, async () => {
            const Users = context.model(User).silent();
            await Users.save({
                name: 'user1'
            });
            /**
             * @type {import('../src/index').Thing}
             */
            let item = await Users.where((x) => x.name === 'user1').getItem();
            item.additionalType = 'AnotherUser';
            await context.model(User).silent().save(item)
            item = await context.model(User).where((x) => x.name === 'user1').silent().getItem();
            expect(item.additionalType).toEqual('User');
        });
    });


    it('should remove user', async () => {
        await TestUtils.executeInTransaction(context, async () => {
            const Users = context.model(User).silent();
            await Users.save({
                name: 'user1'
            });
            let item = await Users.where((x) => x.name === 'user1').getItem();
            expect(item).toBeTruthy();
            await Users.remove(item);
            item = await Users.where((x) => x.name === 'user1').getItem();
            expect(item).toBeFalsy();
        });
    });

    it('should get groups', async () => {
        await TestUtils.executeInTransaction(context, async () => {
            const items = await context.model(Group).getItems();
            expect(items).toBeTruthy();
            expect(items.length).toBeTruthy();
        });
    });

    it('should get groups', async () => {
        await TestUtils.executeInTransaction(context, async () => {
            const items = await context.model(Group).getItems();
            expect(items).toBeTruthy();
            expect(items.length).toBeTruthy();
        });
    });

});

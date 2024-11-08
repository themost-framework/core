import { DataApplication, DataConfigurationStrategy, SchemaLoaderStrategy } from '@themost/data';
import { User, Group, SchemaLoader } from '@themost/core';
import { TestUtils } from './TestUtils';
import { SqliteAdapter } from '@themost/sqlite';

describe('DataApplication', () => {

    /**
     * @type {import('@themost/data').DataContext}
     */
    let context;
    /**
     * @type {DataApplication}
     */
    let app;
    beforeAll(async () => {
        /**
         * @type {DataApplication}
         */
        app = new DataApplication(process.cwd());
        const conf = app.getConfiguration().getStrategy(DataConfigurationStrategy);
        conf.adapterTypes.set('sqlite', {
            name: 'Sqlite Adapter',
            type: SqliteAdapter
        });
        conf.adapters.push({
            name: 'test',
            default: true,
            invariantName: 'sqlite',
            options: {
                database: ':memory:'
            }
        });
        // noinspection JSValidateTypes
        /**
         * @type {import('@themost/data').DefaultSchemaLoaderStrategy}
         */
        const strategy = app.getConfiguration().getStrategy(SchemaLoaderStrategy);
        strategy.loaders.push(new SchemaLoader(app.getConfiguration()));
        context = app.createContext();
    });

    afterAll(async () => {
        if (context) {
            await context.finalizeAsync();
        }
        if (app) {
            await TestUtils.finalize(app);
        }

    });

    it('should get schema', () => {
        const schemaLoader = context.getConfiguration().getStrategy(SchemaLoaderStrategy);
        const schema = schemaLoader.getModelDefinition('Thing');
        expect(schema).toBeTruthy();
    });

    it('should create user', async () => {
        await TestUtils.executeInTransaction(context, async () => {
            await context.model(User).silent().save({
                name: 'user1'
            });
            /**
             * @type {import('../src/index').Thing}
             */
            const item = await context.model(User).where((x) => x.name === 'user1').silent().getItem();
            expect(item).toBeTruthy();
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

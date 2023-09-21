import { DataApplication, DataConfigurationStrategy, SchemaLoaderStrategy, DefaultSchemaLoaderStrategy } from '@themost/data';
import path from 'path';
import { User } from '../src/models/User';
import { TestUtils } from './TestUtils';
import { Group } from '../src/models/Group';

describe('DataApplication', () => {

    /**
     * @type {import('@themost/data').DataContext}
     */
    let context;
    beforeAll(async () => {
        /**
         * @type {DataApplication}
         */
        const app = new DataApplication(process.cwd());
        app.configuration.setSourceAt('settings/schema/loaders', [
            {
                loaderType: '@themost/jspa/platform-server#DefaultEntityLoaderStrategy'
            }
        ]);
        app.configuration.setSourceAt('settings/jspa/imports', [
            path.resolve(__dirname, '../src/index')
        ]);

        app.configuration.setSourceAt('adapterTypes', [
            {
                name: 'Test Adapter',
                invariantName: 'sqlite',
                type: '@themost/sqlite'
            }
        ]);
        app.configuration.setSourceAt('adapters', [
            {
                name: 'test',
                default: true,
                invariantName: 'sqlite',
                options: {
                    database: ':memory:'
                }
            }
        ]);

        app.configuration.useStrategy(function ModuleLoader() {}, function NodeModuleLoader() {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            this.require = (id) => {
                return require(id);
            }
        });
        // reload schema
        app.configuration.useStrategy(SchemaLoaderStrategy, DefaultSchemaLoaderStrategy);
        // reload configuration
        app.configuration.useStrategy(DataConfigurationStrategy, DataConfigurationStrategy);

        context = app.createContext();
    });

    afterAll(async () => {
        if (context) {
            await context.finalizeAsync();
        }
    });

    it('should get schema', () => {
        const schemaLoader = context.getConfiguration().getStrategy(SchemaLoaderStrategy);
        const schema = schemaLoader.getModelDefinition('Thing');
        expect(schema).toBeTruthy();
    });

    it('should create user', async () => {
        TestUtils.executeInTransaction(context, async () => {
            await context.model(User).silent().save({
                name: 'user1'
            });
            const item = await context.model(User).where((x) => x.name === 'user1').silent().getItem();
            expect(item).toBeTruthy();
        });
    });


    it('should remove user', async () => {
        TestUtils.executeInTransaction(context, async () => {
            await context.model(User).silent().save({
                name: 'user1'
            });
            let item = await context.model(User).where((x) => x.name === 'user1').silent().getItem();
            expect(item).toBeTruthy();
            await context.model(User).silent().remove({
                name: 'user1'
            });
            item = await context.model(User).where((x) => x.name === 'user1').silent().getItem();
            expect(item).toBeFalsy();
        });
    });

    it('should get groups', async () => {
        TestUtils.executeInTransaction(context, async () => {
            const items = await context.model(Group).getItems();
            expect(items).toBeTruthy();
            expect(items.length).toBeTruthy();
        });
    });

});
import { DataApplication, DataConfigurationStrategy, SchemaLoaderStrategy, DefaultSchemaLoaderStrategy } from '@themost/data';
import path from 'path';

describe('DataApplication', () => {
    it('should create app', () => {
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

        
        const schemaLoader = app.configuration.getStrategy(SchemaLoaderStrategy);
        const schema = schemaLoader.getModelDefinition('Thing');
        expect(schema).toBeTruthy();
        
    });
});
import {DataApplication, DataConfigurationStrategy, SchemaLoaderStrategy} from '@themost/data';
import {SqliteAdapter} from '@themost/sqlite';
import {SchemaLoader} from '@themost/core';
import {TestUtils} from './TestUtils';

class TestApplication extends DataApplication {
    constructor() {
        super(process.cwd());
        const conf = this.getConfiguration().getStrategy(DataConfigurationStrategy);
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
        // add schema loader of @themost/core
        // noinspection JSValidateTypes
        /**
         * @type {import('@themost/data').DefaultSchemaLoaderStrategy}
         */
        const strategy = this.getConfiguration().getStrategy(SchemaLoaderStrategy);
        strategy.loaders.push(new SchemaLoader(this.getConfiguration()));
    }

    async finalizeAsync() {
        await TestUtils.finalize(this);
    }

}

export {
    TestApplication
}

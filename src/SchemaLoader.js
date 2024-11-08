import { FileSchemaLoaderStrategy } from '@themost/data';
import path from 'path';

export class SchemaLoader extends FileSchemaLoaderStrategy {
    /**
     * @param {import('@themost/common').ConfigurationBase} config
     */
    constructor(config) {
        super(config);
        this.setModelPath(path.resolve(__dirname, '../models'));
    }
}


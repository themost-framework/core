# @themost/core

`@themost/core` is a core data object library for the [@themost-framework](https://github.com/themost-framework/). It provides essential classes and utilities for building data-driven applications.

## Installation

To install the package, use npm:

```sh
npm i @themost/core
```

## Usage

This package includes several models:

- Thing: The most generic type of item.
- Account: Inherits from Thing, represents user accounts.
- User: Inherits from Account, represents individual users.
- Group: Inherits from Account, represents groups of users.
- Permission: Represents permissions assigned to accounts.
- Workspace: Represents workspaces within the application.

`@themost/core` exports a schema loader for loading those generic data models and start using them inside application.

```javascript
import {SchemaLoader} from '@themost/core';
import {DataApplication, DataConfigurationStrategy, SchemaLoaderStrategy} from '@themost/data';
// create application
const app = new DataApplication(process.cwd());
// get schema loader strategy
const strategy = app.getConfiguration().getStrategy(SchemaLoaderStrategy);
// add @themost/core schema loader
strategy.loaders.push(new SchemaLoader(this.getConfiguration()));
```

## License

This project is licensed under the BSD-3-Clause License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/themost-framework/core/issues).

## Contact

For any questions or issues, please open an issue on [GitHub](https://github.com/themost-framework/core).
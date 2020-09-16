# Development tasks

The **tasks** you can run are configured in scripts section of **package.json**. You must have installed node and npm described in **Getting started** section. Then you can execute the tasks using the syntax:

```bash
  npm run TASK_NAME
```

The package.json contains in scripts section:

```json
  "scripts": {
    "commit": "git cz",
    "ng": "ng",
    "start": "ng serve --port 4200",
    "build": "npm run build:prod",
    "build:barrel": "node ./npm-scripts/build-barrel.js",
    "build:dev": "npm run clean:build && ng build --prod --sourceMap=true",
    "build:prod": "npm run clean:build && ng build --prod",
    "clean:build": "rimraf ./dist/*",
    "test": "ng test",
    "test:coverage": "ng test --ci --reporters=jest-junit --reporters=default --coverage --coverageReporters=cobertura",
    "test:watch": "ng test --watchAll",
    "format:fix": "pretty-quick --staged",
    "format:check": "prettier --config ./.prettierrc --list-different \"src/{app,environments,assets}/**/*{.ts,.js,.json,.css,.scss}\"",
    "lint": "ng lint && npm run lint:styles",
    "lint:styles:check": "stylelint-config-prettier-check",
    "lint:styles": "stylelint \"src/app/**/*.scss\"",
    "lint:ts:check": "tslint-config-prettier-check ./tslint.json",
    "e2e": "ng e2e",
    "compodoc": "./node_modules/.bin/compodoc -p src/tsconfig.app.json -d ./dist/docs --includes ./docs"
  }
```

The tasks we have configured are:

- **commit**: Executes a git commit through commitizen prompt.

```bash
  npm run commit
```

- **ng**: Executes a command using Angular CLI.

```bash
  npm run ng COMMAND_NAME --COMMAND_PARAMETERS
```

- **start**: Executes the application over a web dev server at http://localhost:4200.

```bash
  npm start
```

or

```bash
  npm run start
```

- **build**: Executes the task build:prod.

```bash
  npm run build
```

- **build:barrel**: Generates the file _src\app\app.barrel.ts_ that contains all references to all the elements that contains the module in a unique point. This file has references to pipes, componentes, directives and providers found in the module. This task uses regular expressions to detect and group the elements. This barrel it's used in App module to register all elements.

```bash
   npm run build:barrel
```

- **build:dev**: Cleans the _/dist_ folder, builds the application static files in production/release mode with source maps.

```bash
  npm run build:dev
```

- **build:prod**: Cleans the _/dist_ folder, builds the application static files in production/release mode without source maps.

```bash
  npm run build:prod
```

- **clean:build**: Cleans the content of _/dist_ folder.

```bash
  npm run clean:build
```

- **test**: Executes the unit and UI tests.

```bash
  npm test
```

or

```bash
  npm run test
```

- **test:coverage**: Executes the unit and UI tests creating a test result file (junit format) and a coverage file (cobertura format).

```bash
  npm run test:coverage
```

- **test:watch**: Executes the unit and UI tests in watch mode: for each change detected it will execute the tests again.

```bash
  npm run test:watch
```

- **format:fix**: Fixes the staged git files, applying the format specified in the file .prettierrc.

```bash
  npm run format:fix
```

- **format:check**: Checks if all the files in the project pass the format specified in the file .prettierrc.

```bash
  npm run format:check
```

- **lint**: Executes the tslint and stylelint for checking lint rules described in tslint.json and .stylelintrc.

```bash
  npm run lint
```

- **lint:styles:check**: Checks if there is any rule in .stylelintrc wich has some conflict with prettier.

```bash
  npm run lint:styles:check
```

- **lint:styles**: Executes stylelint for checking lint rules described in .stylelintrc.

```bash
  npm run lint:styles
```

- **lint:ts:check**: Checks if there is any rule in tslint.json which has some conflict with prettier.

```bash
  npm run lint:ts:check
```

- **e2e**: Executes end to end tests.

```bash
  npm run e2e
```

- **compodoc**: Creates the HTML documentation with components API and manuals of the application. Documentation will be generated in _dist/docs_.

```bash
  npm run compodoc
```

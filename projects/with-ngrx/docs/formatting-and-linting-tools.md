# Configure formatting and linting tools

## Prettier

We use Prettier to format automatically our code files.

- package.json:

```json
{
  ...
  "scripts": {
    ...
    "format:check": "prettier --config ./.prettierrc --list-different \"src/{app,environments,assets}/**/*{.ts,.js,.json,.css,.scss}\""
    ...
  },
  "devDependencies": {
    ...
    "prettier": "1.19.1"
    ...
  }
  ...
}
```

With the "format:check" npm script, we can check if all of our files pass the Prettier formatting rules.

- .prettierignore: This file is used to specify files that should be ignored by Prettier (as package-lock.json).

- .prettierrc: This file is used to specify our custom options and rules to Prettier.

- VSCode:

1. Install the extension: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

2. Modify our settings.json:

```json
{
  ...
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
  ...
}
```

With these settings, VSCode will format the file using Prettier when we will save it.

## TSLint

We use TSLint to detect linting errors in our TypeScript files.

- package.json

```json
{
  ...
  "scripts": {
    ...
    "lint:ts:check": "tslint-config-prettier-check ./tslint.json"
    ...
  },
  "devDependencies": {
    ...
    "tslint": "5.11.0",
    "tslint-config-prettier": "1.18.0"
    ...
  }
  ...
}
```

With the "lint:ts:check" npm script, we can check if some TSLint rule has any conflict with any Prettier rule.

- tslint.json
  This file is used to specify the linting rules.

  It's important add this line to "tslint.json" to avoid conflicts between TSLint and Prettier rules:

  ```json
  {
    ...
    "extends": ["tslint-config-prettier"]
    ...
  }
  ```

- VSCode

1. Install the extension: https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin

2. Modify our settings.json:

```json
{
  ...
  "editor.codeActionsOnSave": {
    "source.fixAll.tslint": true
  }
  ...
}
```

With these settings, VSCode will fix all TSLint errors in the file when we will save it.

## stylelint

We use stylelint to detect linting errors in our styles files.

- package.json

```json
{
  ...
  "scripts": {
    ...
    "lint:styles:check": "stylelint-config-prettier-check",
    "lint:styles": "stylelint \"src/app/**/*.scss\""
    ...
  },
  "devDependencies": {
    ...
    "stylelint": "13.2.1",
    "stylelint-config-prettier": "8.0.1"
    ...
  }
  ...
}
```

With the "lint:styles:check" npm script, we can check if some stylelint rule has any conflict with any Prettier rule With the "lint:styles" npm script, we can check if we have some style errors in our files.

- VSCode

1. Install the extension: https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint

2. Modify our settings.json:

```json
{
  ...
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true
  }
  ...
}
```

With these settings, VSCode will fix all stylelint errors in the file when we will save it.

- .stylelintrc
  This file is used to specify the linting rules.

  It's important add this line to ".stylelintrc" to avoid conflicts between stylelint and Prettier rules:

  ```json
  {
    ...
    "extends": ["stylelint-config-prettier"]
    ...
  }
  ```

## Commitizen & Commitlint

We use commitizen to format and unify the commit messages done by all the developers through a command prompt. We use commitlint to check the commit messages pass certain validation rules (for example the commit type should be specified in the message).

To install it, we have to execute these next commands:

```bash
npm install -g commitizen
npm install -g cz-customizable
```

- package.json

```json
{
  ...
  "scripts": {
    ...
    "commit": "git cz"
    ...
  },
  "devDependencies": {
    ...
    "commitizen": "4.0.3",
    "@commitlint/cli": "8.2.0",
    "@commitlint/config-conventional": "8.2.0",
    "commitlint-config-cz": "0.13.0",
    "cz-customizable": "6.2.0"
    ...
  },
  "config": {
    "commitizen": {
      "path": "cz-customizable"
    }
  },
  "cz-customizable": {
    "config": "./.cz-config.js"
  }
  ...
}
```

- .cz-config.js: This file is used by "cz-customizable" to customize the "commitizen" prompt options/messages. In addition, it's used by "commitlint" to customize the linting rules. This last task is done with the library "commitlint-config-cz".
- commitlint.config.js: This file is used to specify the commit linting rules.

To do a commit, we have two possibilities:

- We can execute the npm script "commit" from the SPA root path. The advantage of doing this, it's the commitlint validation rules will be checked in the commit message.
- We can execute git commit from another path in the repository.

## Husky

We use husky to be able to use git-hooks and run all formatting and linting tools (and tests) before the developer commits his changes in the repository.

- package.json

```json
{
  ...
  "scripts": {
    ...
    "format:fix": "pretty-quick --staged",
    "lint": "ng lint && npm run lint:styles"
    ...
  },
  "devDependencies": {
    ...
    "husky": "4.2.3",
    "pretty-quick": "2.0.1"
    ...
  },
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
      "pre-commit": "npm run format:fix && npm run lint && npm test"
    }
  }
  ...
}
```

With the "format:fix" npm script, all the format of the files with changes will be fixed before the commit will be done. In addition, through the "commit-msg" hook, the commit message will be checked using the "commitlint" rules.

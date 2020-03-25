# Questions manager SPA

# Getting started

The tools you need to install are:

- Node (10.17.0) and npm (6.11.3). We use [Node version manager](https://github.com/coreybutler/nvm-windows) to work with different versions of Node and npm, but for this project we must use the described versions.

After installation, we must install packages by running the following command inside project root folder:

```bash
    npm ci
```

And then you can execute the application in development mode by executing the following npm script:

```bash
    npm start
```

This file will execute the application in **http://localhost:4200**. Then you can open the browser (we recommend Google Chrome) and set this url to enter the application.

The next step you should do is **How to build documentation** of the project (below). The documentation are the manuals of the application structure, design, architecture, etc.

# How to execute the application

You can execute the application in development mode using the npm script:

```bash
    npm start
```

or in production (release) mode:

```bash
    npm run build
```

# What tasks can I execute? (build, test, lint.. etc)

If you are reading the docs in html format, open the section "Additional documentation", in sub-section **Development tasks** to see all the tasks you can execute.

If your are reading in markdown (.md) format, open the file "./docs/development-tasks.md" to see all the information about dev tasks.

# How to build documentation

You can build the manuals in html format by running:

```bash
    npm run compodoc
```

The most **recommended** advice to understand the project it's build the project docs using the described command an reading the generated file "dist/docs/index.html".

If you can't create the docs in html, you can read the docs in markdown (plain text) that are in:

- **manual**: in "docs" folder. Contains all the explanations about the high-level of the project.
- **tests**: the tests are the real behaviour of the application so then they are the most realistic documentation of the project. You can find and read each test inside "specs" folders. These folder are by proximity inside each component folder.

# Configure your editor

We recommend to use **Visual Studio Code**, installing these extensions:

- [**EditorConfig**](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [**Prettier**](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [**stylelint**](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [**TSLint**](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)

If you don't use this editor, we recommend to install the equivalent tools in your editor.

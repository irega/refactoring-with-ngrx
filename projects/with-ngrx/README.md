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

This script will execute the application at **http://localhost:4200**. Then you can open the browser (we recommend Google Chrome) and open this url to enter into the application.

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

If you are reading the docs in HTML format, open the section _Additional documentation_, an then the sub-section **Development tasks** to see all the tasks you can execute.

If your are reading in markdown (.md) format, open the file _./docs/development-tasks.md_ to see all the information about dev tasks.

# How to build documentation

You can build the manuals in HTML format by running:

```bash
    npm run compodoc
```

In order to understand the project, we recommend build the project docs using the described command and read the generated file _dist/docs/index.html_.

If you can't create the docs in HTML, you can read the docs in markdown (plain text) which are located in:

- **manual**: in _docs_ folder. Contains all the high-level explanations about the project.
- **tests**: the tests are the real behaviour of the application so then they are the most realistic documentation of the project. You can find and read each test inside the _specs_ folders. These folders are located by proximity near to each component.

# Configure your editor

We recommend to use **Visual Studio Code**, installing these extensions:

- [**EditorConfig**](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [**Prettier**](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [**stylelint**](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [**TSLint**](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)

If you don't use this editor, we recommend to install the equivalent tools in your editor.

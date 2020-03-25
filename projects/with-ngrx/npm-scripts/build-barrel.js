var glob = require('glob');
var chalk = require('chalk');
var pathManager = require('path');
var fs = require('fs');

console.log(chalk.green.bold('@Plain Concepts -> Creating application barrels, please wait...'));
let startTime = new Date();

glob('**/*.module.ts', { ignore: ['node_modules/**/*.ts', '**/*routing.module.ts'] }, function(error, files) {
  files.forEach(function(moduleFile) {
    const elements = { components: {}, pipes: {}, directives: {}, providers: {} };
    console.log(chalk.green(`Processing module:`) + ` ${moduleFile}`);
    var moduleFolder = pathManager.dirname(moduleFile);
    glob(
      moduleFolder + '/**/*.ts',
      { ignore: ['**/*.spec.ts', '**/*.barrel.ts', '**/*.e2e.ts', '**/state/**/*.ts'] },
      function(e, f) {
        fillAliases(f, moduleFolder, elements, _ => {
          writeModuleBarrel(elements, moduleFile, moduleFolder);
        });
      }
    );
  });
  console.log(chalk.green.bold(`Done! Elapsed time:`) + ` ${new Date().getTime() - startTime} ms`);
});

function fillAliases(files, moduleFolder, elements, callback) {
  let filePromises = [];
  files.forEach(function(filePath) {
    let promise = new Promise((res, rej) => {
      var chunk = fs.readFileSync(filePath, { encoding: 'utf8' });
      var aliasInfo = getAliasOf(chunk, filePath, moduleFolder);
      if (aliasInfo) {
        aliasInfo.forEach(alias => {
          elements[alias.category][alias.alias] = alias.path;
        });
      }
      res();
    });

    filePromises.push(promise);
  });

  Promise.all(filePromises).then(_ => callback());
}

function getAliasOf(chunk, filePath, moduleFolder) {
  let matchedComponents = [];
  var matches = chunk.match(/(@Injectable|@Component|@Directive|@Pipe)((?!\/\/)((.|\r\n)))*(export class \w*)/g);
  if (matches) {
    for (var i = 0; i < matches.length; i++) {
      var currentMatch = matches[i];
      var componentInfo = getComponentInformation(currentMatch);
      var category = getComponentCategory(componentInfo.componentType);
      if (category !== '') {
        var classStartPosition = currentMatch.search('export class');
        var alias = currentMatch
          .substring(classStartPosition)
          .split('{')[0]
          .split('export class')[1]
          .trim();
        var tsPath = '.\\' + pathManager.relative(moduleFolder, filePath);
        tsPath = tsPath
          .substring(0, tsPath.length - 3)
          .split('\\')
          .join('/');
        matchedComponents.push({ alias: alias, path: tsPath, category: category });
      }
    }
  }

  return matchedComponents;
}

function getComponentCategory(chunk) {
  var category = '';
  if (chunkHasA(chunk, /@Component/)) {
    category = 'components';
  } else if (chunkHasA(chunk, /@Pipe/)) {
    category = 'pipes';
  } else if (chunkHasA(chunk, /@Directive/)) {
    category = 'directives';
  } else if (chunkHasA(chunk, /@Injectable/)) {
    category = 'providers';
  }
  return category;
}

function getComponentInformation(matchedString) {
  var matchedParts = matchedString.split(' ');
  return {
    componentType: matchedParts[0],
    componentName: matchedParts[matchedParts.length - 1]
  };
}

function chunkHasA(chunk, regex) {
  return chunk.search(regex) !== -1;
}

function writeModuleBarrel(el, moduleFile, moduleFolder) {
  var componentsBarrelInfo = getElementsBarrel(el.components);
  var pipesBarrelInfo = getElementsBarrel(el.pipes);
  var directivesBarrelInfo = getElementsBarrel(el.directives);
  var providersBarrelInfo = getElementsBarrel(el.providers);

  var componentsImports = `/* tslint:disable */
${componentsBarrelInfo.imports}
${pipesBarrelInfo.imports}
${directivesBarrelInfo.imports}
${providersBarrelInfo.imports}
export const COMPONENTS = [${componentsBarrelInfo.list}];
export const PIPES = [${pipesBarrelInfo.list}];
export const DIRECTIVES = [${directivesBarrelInfo.list}];
export const PROVIDERS = [${providersBarrelInfo.list}];`;

  const barrelName = pathManager.basename(moduleFile).split('.')[0];
  fs.writeFileSync(`${moduleFolder}/${barrelName}.barrel.ts`, componentsImports, { encoding: 'utf8' });
}

function getElementsBarrel(el) {
  var imports = '',
    list = '';

  for (var element in el) {
    imports += `import {${element}} from '${el[element]}'; \n`;
    list += element + ',';
  }

  return { imports, list };
}

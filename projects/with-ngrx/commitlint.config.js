module.exports = {
  extends: ['cz', '@commitlint/config-conventional'],
  rules: { 'type-case': [2, 'always', ['upper-case', 'lower-case']] }
};

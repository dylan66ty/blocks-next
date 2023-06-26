const path = require('path');
const pkg = require('../../package.json');
const { parseAndWrite } = require('./lib/index.js');

const rootPath = path.resolve(__dirname, '../../');



parseAndWrite({
  version: pkg.version,
  name: pkg.name,
  path: path.resolve(rootPath, './docs/components'),
  typingsPath: path.resolve(rootPath, './packages/global.d.ts'),
  // default match lang
  test: /\.md/,
  outputDir: path.resolve(rootPath, './vetur'),
  tagPrefix: 'bn-',
})
  .then(result => {
    // eslint-disable-next-line no-console
    console.log(`generator types success: ${result} tags generated`);
  })
  .catch(error => {
    console.error('generator types error', error);
    return Promise.reject(error);
  });

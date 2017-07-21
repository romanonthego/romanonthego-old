import fs from 'fs'

// on server we want to exclude node_modules from build
// to use native require() call to this modules
export default function excludeNodeModules() {
  // fuck vertx :)
  const nodeModules = {
    vertx: 'commonjs vertx',
  }

  fs.readdirSync('node_modules')
    .filter((pkg) => ['.bin'].indexOf(pkg) === -1)
    .filter((pkg) => !(/-es6/).test(pkg))
    .forEach((pkg) => {
      nodeModules[`${pkg}`] = `commonjs ${pkg}`
    })

  return nodeModules
}

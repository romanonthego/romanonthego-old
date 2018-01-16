import last from 'lodash/last'

const rawContext = require.context(
  '!!raw-loader!app/components',
  true,
  /\.(jsx?|styl)$/,
)
const context = require.context('app/components', true, /\.demo\.jsx?$/)

const getName = importPath => {
  const importPathArray = importPath.split('/')
  const name = last(importPathArray)

  if (name === 'index') {
    return importPathArray[importPathArray.length - 2]
  }

  return name
}

const getLocation = importPath => {
  const importPathArray = importPath.split('/')
  const name = last(importPathArray)

  if (name === 'index') {
    return importPathArray.slice(2, importPathArray.length - 1)
  }

  return importPathArray.slice(2)
}

const getFiles = (path, name) => {
  const rawKeys = rawContext.keys()
  const sourcePath = path.replace('.demo', '')
  const stylesPath = path.replace(/.demo.jsx?/, '.styl')

  const files = []

  if (rawKeys.includes(sourcePath)) {
    files.push({name: `${name}.js`, content: rawContext(sourcePath)})
  }

  if (rawKeys.includes(stylesPath)) {
    files.push({name: `${name}.styl`, content: rawContext(stylesPath)})
  }

  if (rawKeys.includes(path)) {
    files.push({name: `${name}.demo.js`, content: rawContext(path)})
  }

  return files
}

const mapPath = path => {
  const pathContext = context(path)
  const importPath = `app/components/${/^\.\/(.*)\.demo\.jsx?$/.exec(path)}`
  const {
    location = getLocation(importPath),
    excludeFromLib = false,
    description = '',
  } = pathContext

  if (excludeFromLib) {
    return null
  }

  const name = getName(importPath)
  const files = getFiles(path, name)

  return {
    importPath,
    location,
    // as for default export - default is reserver word, so can not go to destructuring
    demo: pathContext.default || context(path),
    description,
    files,
  }
}

export default context
  .keys()
  .map(mapPath)
  .filter(result => result !== null)

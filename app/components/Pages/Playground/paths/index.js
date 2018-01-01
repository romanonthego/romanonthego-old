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

export default context.keys().map(path => {
  const importPath = `app/components/${/^\.\/(.*)\.demo\.jsx?$/.exec(path)[1]}`
  const location = getLocation(importPath)
  const name = getName(importPath)
  const files = getFiles(path, name)

  return {
    importPath,
    location,
    demo: context(path).default || context(path),
    fullWidth: context(path).fullWidth || false,
    description: context(path).description || '',
    files,
  }
})

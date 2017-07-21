import last from 'lodash/last'

const rawContext = require.context('!!raw-loader!app/components', true, /\.(jsx|styl)$/)
const context = require.context('app/components', true, /\.demo\.jsx$/)

export default context.keys().map((path) => {
  const importPath = `app/components/${/^\.\/(.*)\.demo\.jsx$/.exec(path)[1]}`
  const name = last(importPath.split('/'))
  const rawKeys = rawContext.keys()
  const files = []
  const sourcePath = path.replace('.demo', '')

  if (rawKeys.indexOf(sourcePath) !== -1) {
    files.push({name: `${name}.jsx`, content: rawContext(sourcePath)})
  }

  const stylesPath = path.replace('.demo.jsx', '.styl')

  if (rawKeys.indexOf(stylesPath) !== -1) {
    files.push({name: `${name}.styl`, content: rawContext(stylesPath)})
  }

  if (rawKeys.indexOf(path) !== -1) {
    files.push({name: `${name}.demo.jsx`, content: rawContext(path)})
  }

  return {
    importPath,
    demo: context(path).default || context(path),
    location: importPath.split('/').slice(2),
    fullWidth: context(path).fullWidth || false,
    description: context(path).description || '',
    files,
  }
})

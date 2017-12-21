import 'colors'
import path from 'path'
import MemoryFS from 'memory-fs'
import requireFromString from 'require-from-string'
import webpack from 'webpack'
import ProgressPlugin from 'webpack/lib/ProgressPlugin'

const logError = error => {
  console.log(
    `Prerender compiler error!',\n${error.message},\n${error.stack}`.red,
  )
}

const chunkName = 'prerender'

// wow this tricky one
// this is basicly manualy constructed webpackDevMiddleware
// that we do is we watch for prerender in separate webpack compiler
// and on compile we construct new node module from string
// and pass it to callback :)
// this way we can have hot reload in server prerender (which is cool)
// and do not break our client hot server with node restarting
export default function watchPrerenderCompiler(
  {config, onProgress, onDone} = {},
) {
  const prerenderCompiler = webpack(config)
  const fs = new MemoryFS()

  prerenderCompiler.outputFileSystem = fs

  // listening to webpack progress
  if (onProgress) {
    prerenderCompiler.apply(new ProgressPlugin(onProgress))
  }

  prerenderCompiler.watch({}, (compileError, stats) => {
    if (compileError) {
      logError(compileError)
      onDone(compileError, null)
      return
    }
    try {
      const prerenderFileName = stats.toJson({}).assetsByChunkName[chunkName][0]
      const prerenderFile = path.join(__dirname, 'build', prerenderFileName)

      console.log(prerenderFileName, prerenderFile)

      const prerenderModule = requireFromString(
        fs.readFileSync(prerenderFile, 'utf-8'),
      )

      console.log('Prerender compiled sucessfully!'.green)

      onDone(null, prerenderModule)
    } catch (error) {
      logError(error)
      onDone(error, null)
    }
  })
}

# ecomp
E-comp frontend
webpack@2-based build of bulletproof-tempate, with prerender, optimization and stuff.

note: if you don't use yarn (although you should) just replace `yarn` with `npm run`

## dev
common dev server with hot-reload and any other stuff you can expect.
does not run server-side rendering at any point

```bash
yarn dev
```

## dev with hot-loaded prerender

allows you to debug server-side rendering without restarting server each time
but be aware, it runs two separate webpack compilers - much, much slower than regular `yarn dev`

```bash
yarn dev-prerender
```

## bundle analyzer

will build production bundle for browser and run [bundle analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) for you on `localhost:8090`

```bash
yarn analyze
```

## production build
```bash
yarn build
```

or for separate builds (webpack2 does not extract common chunks correctly if server/browser configs mixed in single export)

```bash
yarn build-server
```

```bash
yarn build-browser
```

## production server

```bash
yarn start
```

or directly call

```bash
node build/server.js
```
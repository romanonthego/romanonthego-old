import {app, partials} from 'app/entries/templates/index'
// development prerender
// may be used to speed up development builds/rebuilds
// just renders template without any server-side prerender
// handles everything on the client

function renderPage(statics = {}) {
  return app.render(
    {
      html: '',
      initialState: '{}',
      statics,
      GLOBALS,
    },
    partials,
  )
}

export default function prerenderDevelopment(req, res, statics = {}) {
  res.send(renderPage(statics))
}

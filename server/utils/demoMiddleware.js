import {demo} from 'app/entries/templates'

export default function demoMiddleware(statics) {
  return (req, res) => {
    res.send(demo({statics}))
  }
}

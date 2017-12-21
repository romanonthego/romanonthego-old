import {browserConfig} from './config'

export default browserConfig({production: true, analyze: process.env.ANALYZE})

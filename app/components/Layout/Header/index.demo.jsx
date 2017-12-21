import React from 'react'
import Demo, {props as DemoProps} from 'react-demo'
import Component from './index'

const Target = props => {
  return <Component {...props} />
}

export default (
  <Demo fullWidth props={{}}>
    {Target}
  </Demo>
)

export const fullWidth = true
export const description = 'Header component'

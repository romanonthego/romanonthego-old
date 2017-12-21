import React from 'react'
import Demo, {props as DemoProps} from 'react-demo'
import Component from './Text'

const Target = ({component, ...props}) => {
  return <Component component={component || 'p'} {...props} />
}

export default (
  <Demo
    fullWidth
    props={{
      children: DemoProps.text('Testing text element'),
      component: DemoProps.text('h1'),
    }}
  >
    {Target}
  </Demo>
)

export const fullWidth = false
export const description = 'Text component'

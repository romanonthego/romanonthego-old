import React from 'react'
import Demo from 'app/components/Elements/DemoLibrary/ComponentDemo'
import DemoProps from 'app/components/Elements/DemoLibrary/ComponentDemo/props'
import Component from './index'

const Target = ({component, ...props}) => {
  return <Component component={component || 'p'} {...props} />
}

export default (
  <Demo
    background="dark"
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

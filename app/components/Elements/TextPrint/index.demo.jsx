import React from 'react'
import Demo from 'app/components/Elements/DemoLibrary/ComponentDemo'
import DemoProps from 'app/components/Elements/DemoLibrary/ComponentDemo/props'
import TextScramble from 'app/components/Elements/TextScramble'
import TextPrint from 'app/components/Elements/TextPrint'
import Component from './index'

const Target = ({component, ...props}) => {
  return <Component component={component || 'p'} {...props} />
}

export default (
  <Demo
    background="dark"
    props={{
      children: DemoProps.text('Testing text print effect'),
      component: DemoProps.string('h1'),
    }}
  >
    {Target}
  </Demo>
)

export const fullWidth = false
export const description = [
  <TextScramble component="h1">Text Print</TextScramble>,
  <TextPrint component="p">
    Simple component for interactive text print{' '}
  </TextPrint>,
]

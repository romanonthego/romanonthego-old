import React from 'react'
import Demo from 'app/components/Elements/PlaygroundLibrary/ComponentDemo'
import DemoProps from 'app/components/Elements/PlaygroundLibrary/ComponentDemo/props'
import TextScramble from 'app/components/Elements/TextScramble'
import TextPrint from 'app/components/Elements/TextPrint'
import Component from './index'

export default (
  <Demo
    background="dark"
    props={{
      children: DemoProps.text('Testing text print effect'),
    }}
  >
    {props => <Component component="h1" {...props} />}
  </Demo>
)

export const location = ['ReactComponents', 'SiteComponents', 'TextPrint']
export const description = (
  <React.Fragment>
    <TextScramble component="h1">Text Print</TextScramble>
    <TextPrint component="p">
      Simple component for interactive text print
    </TextPrint>
  </React.Fragment>
)

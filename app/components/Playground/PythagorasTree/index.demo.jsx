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
      maxLevel: DemoProps.range(6, {min: 1, max: 11, step: 1}),
      // lean: DemoProps.range(0, {min: -0.5, max: 0.5, step: 0.1}),
    }}
  >
    {props => <Component {...props} />}
  </Demo>
)

export const fullWidth = false
export const location = ['ReactComponents', 'Fractals', 'PythogorasTree']
export const description = (
  <React.Fragment>
    <TextScramble component="h1">Pythogoras Tree</TextScramble>
    <TextPrint component="p">Pythogoras Tree</TextPrint>
  </React.Fragment>
)

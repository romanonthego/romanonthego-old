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

export const location = ['ReactComponents', 'Fractals', 'PythogorasTree']
export const description = (
  <React.Fragment>
    <TextScramble component="h1">Pythogoras Tree</TextScramble>
    <TextPrint component="p">
      Recursive React component - each node of the tree creates two more nodes
      of the tree and so on and so on until max level is reached or node became
      less than 1px in size.
    </TextPrint>
    <TextPrint>
      Omtimized with recompose and fast-memoize for better perfomance. Even
      still - `maxLevel` more than `11` will more likely cause browser tab to
      crash :)
    </TextPrint>
  </React.Fragment>
)

import React from 'react'
import Demo from 'app/components/Elements/PlaygroundLibrary/ComponentDemo'
import DemoProps from 'app/components/Elements/PlaygroundLibrary/ComponentDemo/props'
import TextScramble from 'app/components/Elements/TextScramble'
import TextPrint from 'app/components/Elements/TextPrint'
import Component from './index'

export default (
  <Demo
    background="none"
    props={{
      rows: DemoProps.range(50, {min: 10, max: 100, step: 1}),
      columns: DemoProps.range(50, {min: 10, max: 100, step: 1}),
      generationTimeout: DemoProps.range(50, {min: 50, max: 2000, step: 50}),
    }}
  >
    {props => <Component {...props} />}
  </Demo>
)

export const location = ['ReactComponents', 'CellularAutomata', 'GameOfLife']
export const description = (
  <React.Fragment>
    <TextScramble component="h1">Game of Life</TextScramble>
    <TextPrint component="p">Game of Life</TextPrint>
  </React.Fragment>
)

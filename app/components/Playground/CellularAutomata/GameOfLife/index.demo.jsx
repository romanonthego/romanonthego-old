import React from 'react'
import Demo from 'app/components/Elements/PlaygroundLibrary/ComponentDemo'
import DemoProps from 'app/components/Elements/PlaygroundLibrary/ComponentDemo/props'
import TextScramble from 'app/components/Elements/TextScramble'
import TextPrint from 'app/components/Elements/TextPrint'
import Component from './index'

const Target = (props = {}) => {
  return <Component {...props} />
}

export default (
  <Demo
    background="dark"
    props={{
      maxLevel: DemoProps.number(6, 1, 11),
    }}
  >
    {Target}
  </Demo>
)

export const fullWidth = false
export const location = ['ReactComponents', 'CellularAutomata', 'GameOfLife']
export const description = (
  <React.Fragment>
    <TextScramble component="h1">Game of Life</TextScramble>
    <TextPrint component="p">Game of Life</TextPrint>
  </React.Fragment>
)

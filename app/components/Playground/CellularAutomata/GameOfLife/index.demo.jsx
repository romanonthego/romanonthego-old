import React from 'react'
import Demo from 'app/components/Elements/PlaygroundLibrary/ComponentDemo'
import DemoProps from 'app/components/Elements/PlaygroundLibrary/ComponentDemo/props'
import TextScramble from 'app/components/Elements/TextScramble'
import TextPrint from 'app/components/Elements/TextPrint'
import LinkScramble from 'app/components/Elements/LinkScramble'
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
    <LinkScramble to="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
      Conway’s Game of Life
    </LinkScramble>
    <TextPrint component="p">
      Designed and developed as React component.
    </TextPrint>
    <TextPrint component="p">
      Not very performant as React responsible for every cell updates as well as
      grid updates (canvas and pure js will be MUCH more faster), but still.
    </TextPrint>
    <TextPrint component="p">
      Edges of the Grid treated as portals, so grid is infinite in the way.
    </TextPrint>
  </React.Fragment>
)

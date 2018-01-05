import React from 'react'
import Demo from 'app/components/Elements/DemoLibrary/ComponentDemo'
// import DemoProps from 'app/components/Elements/DemoLibrary/ComponentDemo/props'
import TextScramble from 'app/components/Elements/TextScramble'
import TextPrint from 'app/components/Elements/TextPrint'
// import Component from './index'

const Target = ({component, ...props}) => {
  return <div />
}

export default (
  <Demo background="dark" props={{}}>
    {Target}
  </Demo>
)

export const fullWidth = false
export const location = ['Code', 'DailyCodingProblems', 'StaircaseWithNSteps']
export const description = (
  <React.Fragment>
    <TextScramble component="h1">StaircaseWithNSteps</TextScramble>
    <TextPrint component="p">
      Simple component for interactive text print
    </TextPrint>
  </React.Fragment>
)

import React from 'react'
import Demo from 'app/components/Elements/DemoLibrary/ComponentDemo'
import DemoProps from 'app/components/Elements/DemoLibrary/ComponentDemo/props'
import TextPrint from 'app/components/Elements/TextPrint'
import TextScramble from 'app/components/Elements/TextScramble'
import LinkScramble from 'app/components/Elements/LinkScramble'
import Component from './index'

const Target = ({component, ...props}) => {
  return <Component component={component || 'p'} {...props} />
}

export default (
  <Demo
    background="dark"
    props={{
      children: DemoProps.text('Testing text scramble effect'),
      component: DemoProps.string('h1'),
    }}
  >
    {Target}
  </Demo>
)

export const fullWidth = false
export const location = ['ReactComponents', 'SiteComponents', 'TextScramble']
export const description = (
  <React.Fragment>
    <TextScramble component="h1">Text Scramble</TextScramble>
    <TextPrint component="p">
      React pure component for text scramble effect. Highly effective, only
      render what it absolutly needs to. Utilises `requestAnimationFrame` under
      the hood. Reworked to react component from{' '}
    </TextPrint>
    <LinkScramble to="https://codepen.io/soulwire/pen/mErPAK">
      Text Scramble Effect codepen
    </LinkScramble>
  </React.Fragment>
)

import React from 'react'
import Demo from 'app/components/Elements/PlaygroundLibrary/ComponentDemo'
import DemoProps from 'app/components/Elements/PlaygroundLibrary/ComponentDemo/props'
import TextPrint from 'app/components/Elements/TextPrint'
import TextScramble from 'app/components/Elements/TextScramble'
import LinkPrint from 'app/components/Elements/LinkPrint'
import Component from './index'

export default (
  <Demo
    background="dark"
    props={{
      children: DemoProps.text('Testing text scramble effect'),
    }}
  >
    {props => <Component component="h1" {...props} />}
  </Demo>
)

export const location = ['ReactComponents', 'SiteComponents', 'TextScramble']
export const description = (
  <React.Fragment>
    <TextScramble component="h1">Text Scramble</TextScramble>
    <TextPrint component="p">
      React pure component for text scramble effect. Highly effective, only
      render what it absolutly needs to. Utilises `requestAnimationFrame` under
      the hood. Reworked to react component from
    </TextPrint>
    <LinkPrint to="https://codepen.io/soulwire/pen/mErPAK">
      Text Scramble Effect codepen
    </LinkPrint>
  </React.Fragment>
)

import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {groupBy, values, tail, unnest} from 'ramda'
import css from './DemoPageLayout.styl'

const locationCutHead = item => ({...item, location: tail(item.location)})

const isLeaf = item => item.location.length === 1

const isNode = item => item.location.length > 1

const node = children => ({
  type: 'node',
  name: children[0].location[0],
  children: toTree(children.map(locationCutHead)),
})

const leaf = item => ({
  type: 'leaf',
  name: item.location[0],
  hash: item.hash,
})

const groupToTree = group => {
  const children = group.filter(isNode)

  return group
    .filter(isLeaf)
    .map(leaf)
    .concat(children.length > 0 ? [node(children)] : [])
}

const toTree = arr =>
  unnest(values(groupBy(item => item.location[0], arr)).map(groupToTree))

const MenuNode = ({name, current, children}) => (
  <div className={css.node}>
    <div className={css.nodeName}>{name}</div>
    <Menu items={children} current={current} />
  </div>
)

const MenuLeaf = ({hash, current, name}) => (
  <a href={`#!${hash}`} className={css.leaf} data-current={current === hash}>
    {name}
  </a>
)

const Menu = ({items, topLevel, current}) => (
  <div className={css.menu}>
    {items.map(
      (item, i) =>
        item.type === 'leaf' ? (
          <MenuLeaf {...item} current={current} key={i} />
        ) : (
          <MenuNode {...item} current={current} key={i} />
        ),
    )}
  </div>
)

export default class DemoPageLayout extends PureComponent {
  static propTypes = {
    menu: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    children: PropTypes.node,
    currentHash: PropTypes.string,
  }

  render() {
    const {menu, children, currentHash} = this.props

    return (
      <div className={css.wrap}>
        <div className={css.menuWrap}>
          <Menu items={toTree(menu)} topLevel current={currentHash} />
        </div>
        <div className={css.content} key={currentHash}>
          {children}
        </div>
      </div>
    )
  }
}

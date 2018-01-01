import React, {PureComponent} from 'react'
import T from 'prop-types'
import mapValues from 'lodash/mapValues'
import pick from 'lodash/pickBy'
import pairs from 'lodash/toPairs'
import zipObject from 'lodash/zipObject'
import forOwn from 'lodash/forOwn'
import set from 'lodash/set'
import propsDefenitions from './props'
import Layout from './Layout'
import Controls from './Controls'
import stringify from './stringify'

const flattenObjProps = (prop, path) =>
  pairs(prop)
    .map(([key, value]) => {
      const fullPath = [...path, key]

      if (value.type !== 'shape') {
        return [[fullPath.join('.'), value]]
      }

      return flattenObjProps(value.props, fullPath)
    })
    .reduce((head, tail) => head.concat(tail), [])

const flattenProps = (props, path = []) => {
  return flattenObjProps(props, path).reduce((endProps, [key, value] = []) => {
    return {
      ...endProps,
      [key]: value,
    }
  }, {})
}

const nestProps = flatProps => {
  const props = {}

  forOwn(flatProps, (value, key) => {
    set(props, key, value)
  })

  return props
}

const getValueProps = props => pick(props, x => x.type === 'value')
const getCallbackProps = props => pick(props, x => x.type === 'callback')

export default class ComponentDemo extends PureComponent {
  static propTypes = {
    props: T.object,
    fullWidth: T.bool,
    target: T.oneOfType([T.func, T.string]),
    children: T.func,
    codeIndentDepth: T.number,
    background: Layout.propTypes.background,
  }

  static props = {...propsDefenitions}

  static defaultProps = {
    props: {},
    fullWidth: false,
    codeIndentDepth: 3,
    background: 'light',
  }

  constructor(props) {
    super(props)

    const {props: demoProps} = props

    const flatProps = flattenProps(demoProps)

    console.log(flatProps)

    this.state = {
      values: mapValues(getValueProps(flatProps), x => x.initialValue),
      logs: mapValues(getCallbackProps(flatProps), () => []),
    }
  }

  getCallbacks = props => {
    return mapValues(getCallbackProps(props), (x, key) => {
      return (...args) => {
        const {map, callbackType} = x
        const result = map
          ? stringify(map(...args))
          : args.map(stringify).join(', ')
        const {logs} = this.state
        const nextLog =
          callbackType === 'logLatest' ? [result] : [result, ...logs[key]]
        this.setState(state => ({logs: {...state.logs, [key]: nextLog}}))
      }
    })
  }

  updateValues = changes => {
    const updater =
      typeof changes === 'function'
        ? state => {
            return {values: changes(state.values)}
          }
        : state => {
            return {values: {...state.values, ...changes}}
          }
    this.setState(updater)
  }

  render() {
    const {values, logs} = this.state
    const {children, fullWidth, codeIndentDepth, background, props} = this.props

    const flatProps = flattenProps(props)

    const targetProps = nestProps({...values, ...this.getCallbacks(flatProps)})

    const targetEl = children ? (
      children(targetProps, this.updateValues)
    ) : (
      <this.props.target {...targetProps} />
    )

    const controlsProps = {
      logs,
      values,
      codeIndentDepth,
      targetEl,
      onTop: fullWidth,
      props: getValueProps(flatProps),
      onChange: this.updateValues,
    }
    const controlsEl = <Controls {...controlsProps} />

    const layoutProps = {fullWidth, targetEl, controlsEl, background}

    return <Layout {...layoutProps} />
  }
}

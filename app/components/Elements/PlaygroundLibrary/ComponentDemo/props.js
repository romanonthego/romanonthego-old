import Noop from './Controls/ControlNoop'
import String from './Controls/ControlString'
import Number from './Controls/ControlNumber'
import Range from './Controls/ControlRange'
import Text from './Controls/ControlText'
import Json from './Controls/ControlJson'
import Bool from './Controls/ControlBool'
import Choices from './Controls/ControlChoices'
import stringify from './stringify'

export default {
  constant(initialValue) {
    return {
      type: 'value',
      Control: Noop,
      initialValue,
    }
  },

  string(initialValue) {
    return {
      type: 'value',
      Control: String,
      initialValue,
    }
  },

  number(initialValue, min, max) {
    return {
      type: 'value',
      Control: Number,
      initialValue,
      controlProps: {
        min,
        max,
      },
    }
  },

  range(initialValue, {min, max, step}) {
    return {
      type: 'value',
      Control: Range,
      initialValue,
      controlProps: {
        min,
        max,
        step,
      },
    }
  },

  text(initialValue) {
    return {
      type: 'value',
      Control: Text,
      initialValue,
    }
  },

  json(initialValue) {
    return {
      type: 'value',
      Control: Json,
      initialValue,
    }
  },

  shape(props) {
    return {
      type: 'shape',
      props,
    }
  },

  bool(initialValue) {
    return {
      type: 'value',
      Control: Bool,
      initialValue,
    }
  },

  choices(options, _initialValue) {
    const normOptions = Array.isArray(options)
      ? options.map(x => ({label: stringify(x), value: x}))
      : Object.keys(options).map(key => ({label: key, value: options[key]}))

    const initialValue =
      _initialValue === undefined
        ? normOptions[0].value
        : normOptions.filter(
            x => x.label === _initialValue || x.value === _initialValue,
          )[0].value

    return {
      type: 'value',
      Control: Choices,
      initialValue,
      controlProps: {
        options: normOptions,
      },
    }
  },

  callback: {
    log(map = null) {
      return {
        type: 'callback',
        callbackType: 'log',
        map,
      }
    },

    logLatest(map = null) {
      return {
        type: 'callback',
        callbackType: 'logLatest',
        map,
      }
    },
  },
}

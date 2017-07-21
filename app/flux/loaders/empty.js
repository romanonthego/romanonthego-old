export default {
  key: 'empty',

  promise: ({store: {dispatch, getState}}) => {
    return Promise.resolve('empty')
  }
}

import window from 'app/utils/window'

// external redux devtools via chrome extention
// https://github.com/zalmoxisus/redux-devtools-extension#implementation
const {devToolsExtension = () => f => f} = window

export default devToolsExtension

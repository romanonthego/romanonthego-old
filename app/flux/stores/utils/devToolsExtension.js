import window from 'app/utils/window'

// simple fallback to implement proxy-everthing middleware
const fallback = () => (f) => f

// external redux devtools via chrome extention
// https://github.com/zalmoxisus/redux-devtools-extension#implementation
export default window.devToolsExtension || fallback

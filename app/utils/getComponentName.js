export default function getComponentName(Component) {
  return Component ? Component.displayName || Component.name : 'SomeComponent'
}

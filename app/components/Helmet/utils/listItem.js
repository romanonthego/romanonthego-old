import compose from './compose'

export default function listItemSchema(item) {
  return compose('ListItem', item, {nested: true})
}

export default () => true

export const onlyOnClient = item => item.onlyOnClient

export const onServer = item => !item.onlyOnClient

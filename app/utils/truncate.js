export default (num, digits = 2) => {
  const mult = 10 ** digits

  return Math.floor(num * mult) / mult
}

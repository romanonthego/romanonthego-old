export default function(...args) {
  if (typeof window !== 'undefined' && window && window.ga) {
    window.ga.apply(null, args)
  }
}

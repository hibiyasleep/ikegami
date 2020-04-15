export default (namespace, keys) => {
  let o = {}
  for(let key of keys) {
    o[key] = {
      get() { return this.$store.state[namespace][key] },
      set(v) { this.$store.commit(namespace +'/set', { k: key, v })}
    }
  }
  return o
}

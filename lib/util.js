
const filters = {}

// formats float
filters.decimal = function filter_decimal(v, digit = 1, _default = 0) {
  v = typeof v === 'number'? v : parseFloat(v)
  return (v || _default).toFixed(digit)
}

filters.pct = function filter_pct(_) {
  return ((_ || '') * 100).toFixed(1) + '%'
}

filters.pad = function filter_pad(_, mindigit = 2) {
  const s = ('000000000000' + _)
  const orig = ('' + _).length
  return s.slice(-Math.max(orig, mindigit))
}

export const utils = {
  sum(array) {
    let t = 0
    for(let i of array) {
      t += (i || 0)
    }
    return t
  }
}


export default function install(Vue) {
  for(let k in filters) {
    Vue.filter(k, filters[k])
  }
  Vue.prototype.$util = utils
}

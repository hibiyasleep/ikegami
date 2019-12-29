
const DECIMAL_POSTFIXES = {
  0: '',
  3: 'k',
  6: 'M'
}

const decimal = function filter_decimal(v, digit = 1, _default = 0) {
  v = typeof v === 'number'? v : parseFloat(v)
  digit = +digit // loose conversion to number
  if(digit < 0) {
    let r = ''
    const decimals = ((-digit) % 3)
    const multiplier = Math.floor((1 - digit) / 3) * 3

    v /= Math.pow(10, multiplier)

    return v.toFixed(decimals) + DECIMAL_POSTFIXES[multiplier]
  } else {
    return (v || _default).toFixed(digit)
  }
}

const pct = function filter_pct(_) {
  return ((_ || '') * 100).toFixed(1) + '%'
}

const pad = function filter_pad(_, mindigit = 2) {
  const s = ('000000000000' + _)
  const orig = ('' + _).length
  return s.slice(-Math.max(orig, mindigit))
}

export const filters = {
  decimal,
  pct,
  pad
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

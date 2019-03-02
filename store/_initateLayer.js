import store from './index'

export default function initateLayer(layer) {
  layer.on('data', d => {
    store.dispatch('encounter/update', d)
  })

  layer.on('logline', d => {
    store.dispatch('encounter/logline', d)
  })

  layer.on('status', d => {
    if(d.type === 'lock') {
      store.commit('settings/set', {
        hide_handle: d.message
      })
    }
  })

  layer.connect()
}

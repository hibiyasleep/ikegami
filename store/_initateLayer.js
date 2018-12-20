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
      // TODO: hide/show with this received data
      // document.body.classList.toggle(
      //   'disable-handle',
      //   d.message && config.get('element.resize-handle')
      // )
    }
  })

  layer.connect()
}

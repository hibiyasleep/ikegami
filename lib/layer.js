'use strict'

import EventEmitter from './event-emitter'

const resolveSockURI = function() {
  let o = /[?&]HOST_PORT=(wss?:\/\/[^&\/]+)/.exec(location.search)
  return o && o[1]
}

const RECONNECT_TIMEOUT = 2000
const RECONNECT_RETRY = 5

const WS_REQUEST_COMMAND = {
  'end': 'RequestEnd',
  'capture': 'Capture'
}

const MESSAGE_STRIP = /\x02.+\x03([^\x03]|$)/

class Layer extends EventEmitter {
  constructor() {
    super()

    this.type = false
    this.features = []
    this.status = {}

    window.addEventListener('message', e => {
      this.emit('message', {
        type: 'window',
        message: e.data
      })
    })
  }
  supports(feature) {
    return this.features.indexOf(feature) !== -1
  }
  connect() { return true }
  request(feature) { return false }
}

export class WSLayer extends Layer {

  constructor() {
    super()

    this.type = 'ws'
    this.features = ['end', 'capture']

    this.uri = resolveSockURI()
    this.ws = {}

    if(this.uri === 'ws://:10501') {
      this.uri = 'ws://localhost:10501'
    }

    this.canRetry = RECONNECT_RETRY
    this.retryTimeout = null
    this._overlayid = ''

    window.addEventListener('message', e => {
      this.emit('message', e.data)
    })
  }

  connect() {
    if(!this.uri) return false

    this.ws.miniparse = new WebSocket(this.uri + '/MiniParse')
    this.ws.logline = new WebSocket(this.uri + '/BeforeLogLineRead')

    this.ws.miniparse.onmessage = e => {
      this.canRetry = RECONNECT_RETRY
      this._onmessage(e)
    }
    this.ws.logline.onmessage = e => {
      this.canRetry = RECONNECT_RETRY
      this._onlogline(e)
    }
    const onerror = e => {
      this.ws.miniparse.close()
      console.error(e)
    }
    const onclose = e => {
      if(!this.canRetry) return
      this.emit('closed', {
        code: e.code,
        reconnecting: this.canRetry--
      })
      this.retryTimeout = setTimeout(_ => {
        this.connect()
      }, 2000)
    }

    this.ws.miniparse.onerror = onerror
    // this.ws.logline.onerror = onerror

    this.ws.miniparse.onclose = onclose
    // this.ws.logline.onclose = onclose
  }

  request(feature) {
    if(!(feature in WS_REQUEST_COMMAND)) {
      return false
    }
    if('overlayWindowId' in window && this._overlayid !== overlayWindowId) {
      this._overlayid = window.overlayWindowId
      this._send({ // WHY THE FUCK
        type: 'set_id',
        id: this._overlayid
      })
    }
    this._send({
      type: 'overlayAPI',
      to: this._overlayid,
      msgtype: WS_REQUEST_COMMAND[feature],
      msg: undefined
    })
  }

  _send(m) {
    if(this.ws.miniparse.readyState === 1) {
      if(typeof m === 'string') {
        this.ws.miniparse.send(m)
      } else {
        this.ws.miniparse.send(JSON.stringify(m))
      }
      return true
    } else return false
  }

  _premessage(e, responsePing = false) {
    if(e.data === '.') {
      if(responsePing) {
        this._send('.') // pong!
      }
      return
    }

    try {
      return JSON.parse(e.data)
    } catch(err) {
      console.error(err, e.data)
      return
    }
  }

  _onmessage(e) {
    const d = this._premessage(e)
    if(!d) return

    if(d.type === 'broadcast') {

      switch(d.msgtype) {
        case 'broadcast':
          this.emit('message', {
            type: 'broadcast',
            from: d.from,
            message: d.msg
          })
          break

        case 'CombatData':
          this.emit('data', d.msg)
          break

      }
    } else if(d.type === 'send') {
      this.emit('message', {
        type: 'single',
        from: d.from,
        message: d.msg
      })
    } else if(d.type === 'set_id') {
      this._overlayid = d.id
    }
  }

  _onlogline(e) {
    const d = this._premessage(e)
    if(!d) return

    // TODO: filter tags

    // achievement:
    // t 02 27 1f 06 �_ 03 �_ 01 01 �_ 17
    // | ed98bc eb8f88 ec9d98 20 ec868c ec9aa9 eb8f8c ec9db4
    // | 03 02 13 06 �_ �_ �_ 7b 1a 03
    //   ee82bb
    // t 02 13 02 �_ 03
    //   ed98bc eb8f88 ec9d98 20 ec868c ec9aa9 eb8f8c ec9db4
    // t 02 27 07 �_ 01 01 01 �_ 01 03

    // name:
    // t 02 27 20 01 10 01 01 �_ 07
    // | ed98b8 eb9e8f
    // | 03
    //   ed98b8 eb9e8f
    // t 02 27 07 �_ 01 01 01 �_ 01 03

    if(d.msgtype === 'Chat') {
      const [ opcode, timestamp, ...tokens ] = d.msg.split('|')

      this.emit('logline', {
        type: parseInt(opcode, 10),
        ts: timestamp,
        payload: tokens
      })
    } else if(d.msgtype === 'SendCharName') {
      this.emit('logline', {
        type: 2,
        ts: Date.now(),
        payload: [ d.msg.charID.toString(16), d.msg.charName ]
      })
    } else if(d.msgtype === 'AddCombatant') { // initial event
      d.msg = d.msg || {}
      this.emit('logline', {
        type: 3,
        ts: Date.now(),
        payload: [
          (d.msg.id || 0).toString(16),
          d.msg.name,
          d.msg.job,
          d.msg.level,
          d.msg.max_hp,
          d.msg.max_mp,
          d.msg.owner_id
        ]
      })
    }
  }

}

export class LegacyLayer extends Layer {

  constructor() {
    super()
    this.type = 'legacy'
    this.connected = false
    this.features = []

    this.status.locked = false
    if(window.OverlayPluginApi && window.OverlayPluginApi.endEncounter) {
      this.features.push('end')
    }
  }

  connect() {
    if(this.connected) return
    document.addEventListener('onOverlayDataUpdate', e => {
      this.emit('data', e.detail)
    })
    document.addEventListener('onOverlayStateUpdate', e => {
      this.status.locked = e.detail.isLocked
      this.emit('status', {
        type: 'lock',
        message: e.detail.isLocked
      })
    })
    document.addEventListener('onBroadcastMessageReceive', e => {
      this.emit('message', {
        type: 'broadcast',
        message: e.detail.message
      })
    })
    document.addEventListener('onRecvMessage', e => {
      this.emit('message', {
        type: 'single',
        message: e.detail.message
      })
    })
    document.addEventListener('onLogLine', e => {
      let d = e.detail
      if(d.opcode !== undefined) {
        if(d.opcode !== 56) {
          this.emit('logline', {
            type: d.opcode,
            ts: d.timestamp,
            payload: d.payload
          })
        } else {
          this.emit('echo', d.payload[3])
        }
      } else {
        this.emit('echo', d.message)
      }
    })
    this.connected = true
  }

  request(feature) {
    if(feature === 'end'
    && 'OverlayPluginApi' in window
    && 'endEncounter' in window.OverlayPluginApi) {
      window.OverlayPluginApi.endEncounter()
      return true
    }
    return false
  }
}

export default function DetectLayer() {
  if(resolveSockURI()) { // has HOST_PORT?
    return WSLayer
  } else {
    return LegacyLayer
  }
}

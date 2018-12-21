import Vue from 'vue'
import Vuex from 'vuex'

const PET_MAPPING = {
  '카벙클 에메랄드': 'acn-pet',
  '카벙클 토파즈': 'acn-pet',
  '카벙클 루비': 'acn-pet',
  '가루다 에기': 'garuda',
  '타이탄 에기': 'titan',
  '이프리트 에기': 'ifrit',
  '요정 에오스': 'eos',
  '요정 셀레네': 'selene',
  '자동포탑 룩': 'rook',
  '자동포탑 비숍': 'bishop',
  'Emerald Carbuncle': 'acn-pet',
  'Topaz Carbuncle': 'acn-pet',
  'Ruby Carbuncle': 'acn-pet',
  'Garuda-Egi': 'garuda',
  'Titan-Egi': 'titan',
  'Ifrit-Egi': 'ifrit',
  'Eos': 'eos',
  'Selene': 'selene',
  'Rook Autoturret': 'rook',
  'Bishop Autoturret': 'bishop',
  'カーバンクル・エメラルド': 'acn-pet',
  'カーバンクル・トパーズ': 'acn-pet',
  'カーバンクル・ルビー': 'acn-pet',
  'ガルーダ・エギ': 'garuda',
  'タイタン・エギ': 'titan',
  'イフリート・エギ': 'ifrit',
  'フェアリー・エオス': 'eos',
  'フェアリー・セレネ': 'selene',
  'オートタレット・ルーク': 'rook',
  'オートタレット・ビショップ': 'bishop'
  // TODO: add another languages
  // TODO: move to const
}

const resolveOwner = function resolveOwner(_) {
  let o = /^.+? \((.+?)\)$/.exec(_)
  return o && o[1] || undefined
}

const resolveJobFromName = function resolveJobFromName(_job, _name) {
  _job = _job || ''

  const o = /^(.+?) \((.+?)\)$/.exec(_name)
  if(!o) {
    if(_name === 'Limit Break' || _name === '리미트 브레이크') {
      return ['limit-break', 'Limit Break', '']
    } else {
      return [_job.toLowerCase(), _name, '']
    }
  }

  o[0] = PET_MAPPING[o[1]] || 'chocobo'

  // TODO: make this localizable again (from kagerou)
  return o
}

const _state = () => ({
  encounter: {},
  combatants: [],
  allies: {},
  party: [],
  topdps: 0,
  active: false
})

export default {
  state: _state(),
  getters: {
    allyNames(state) {
      return state.party.map(_ => state.allies[_]).filter(_ => _)
    },
    rank(state, getters, rootState) {
      if(state.combatants.length === 0) {
        return 0
      }
      return state.combatants.findIndex(_ => _.name === 'YOU' || _.name === rootState.settings.username) + 1
    }
  },
  mutations: {
    setEncounter(state, encounter) {
      const [ user, skill, amount ] = encounter.maxhit.split('-')
      Vue.set(state, 'encounter', {
        duration:  parseInt(encounter.DURATION),
        title:              encounter.title,
        zone:               encounter.CurrentZoneName,
        rdps:    parseFloat(encounter.encdps),
        dps1m:   parseFloat(encounter.Last60DPS),
        max:     [ parseInt(amount), skill, user ],
        rhps:    parseFloat(encounter.enchps),
        healed:    parseInt(encounter.healed),
        deaths:    parseInt(encounter.deaths)
      })
    },
    setCombatants(state, { combatants, playerName }) {
      let players = {}
      // const containsYou = combatants.some(_ => _.name === 'YOU')

      for(let k in combatants) {
        let c = combatants[k]
        const [
          _job,
          _name,
          _owner
        ] = resolveJobFromName(c.Job, c.name === 'YOU' && playerName? playerName : c.name)

        if(!_job) {
          continue
        }

        const [ dskill, damount ] = c.maxhit.split('-')
        const [ hskill, hamount ] = c.maxheal.split('-')
        const o = {
          job:                _job,
          name:               _name,
         _name:               c.name,
         _owner:              _owner,
          dps:     parseFloat(c.encdps),
          dps1m:   parseFloat(c.Last60DPS),
          maxhit:  [ parseInt(damount) || 0, dskill || '---' ],
          swings:    parseInt(c.swings),
          miss:      parseInt(c.misses),
          ch:        parseInt(c.crithits),
          dh:        parseInt(c.DirectHitCount),
          cdh:       parseInt(c.CritDirectHitCount),
          hps:     parseFloat(c.enchps),
          healed:    parseInt(c.healed),
          maxheal: [ parseInt(hamount) || 0, hskill || '---' ],
          ohpct:              c.OverHealPct,
          oh:        parseInt(c.overHeal),
          shield:    parseInt(c.damageShield),
          absorb:    parseInt(c.absorbHeal),
          deaths:    parseInt(c.deaths),
          minion_total: 0,
          minion_over: 0
        }
        o.critcounts = [ o.ch, o.dh, o.cdh ].join('/')
        o.critcounts_wo_direct = [ o.ch, o.cdh ].join('/')

        // override name with maxhit/heal skillname when LMB used once
        if(o.job === 'limit-break' && (
           o.swings === 1 ||
           o.maxheal[0] === o.healed
        )) {
          if(dskill) {
            o.name = dskill
          } else if(hskill) {
            o.name = hskill
          }
        }

        players[o._name] = o
      }

      for(let index in players) {
        const player = players[index]
        let { name, _owner: owner } = player

        if(owner && players[owner]) {
          let ownerData = players[owner] || {}
          let petData = players[index]

          for(let k in ownerData) {
            let old = ownerData[k]
            let pet = petData[k]

            if(typeof old === 'string') {
              if(k === 'job' || k === 'name') {
                ownerData[k] = old // FIXME
              }
              if(k.endsWith('%')) {
                ownerData[k] = old // FIXME
              }
            } else if(k === 'maxhit' || k === 'maxheal') {
              if(old[0] >= pet[0]) {
                ownerData[k] = old // FIXME
              } else {
                ownerData[k] = pet
              }
            } else if(k === 'healed') {
              ownerData[k] += pet
              ownerData.minion_heal = pet
            } else if(k === 'oh') {
              ownerData[k] += pet
              ownerData.minion_over = pet
            } else {
              ownerData[k] = (old + pet) || 0
            }
          }
          ownerData.critcounts = [
            ownerData.dh,
            ownerData.ch,
            ownerData.cdh
          ].join('/')

          delete players[index] // merge done
        }
      }

      players = Object.keys(players).map(_ => players[_]).sort((a, b) => b.dps - a.dps)

      state.topdps = players[0]? players[0].dps : 0

      Vue.set(state, 'combatants', players)
    },
    addPlayer(state, user) {
      Vue.set(state.allies, user.uid, user)
    },
    removePlayer(state, { uid }) {
      delete state.allies[uid]
    },
    setParty(state, uids) {
      Vue.set(state, 'party', uids)
    }
  },
  actions: {
    // Listeners
    update({ commit, dispatch, rootState }, { Encounter, Combatant }) {
      if(!Encounter || Encounter.hits < 1) {
        return
      }
      commit('setEncounter', Encounter)
      commit('setCombatants', {
        combatants: Combatant,
        playerName: rootState.settings.username
      })
    },
    logline({ commit, dispatch }, { type, payload }) {
      if(type === 2) {
        // register my name
        commit('settings/setName', payload, { root: true })
      }/* else if(type === 3) {
        const [ uid, name, job, level, hp, mp, ownerid ] = payload
        if(uid && uid.startsWith('4') && ownerid === '0') return
        commit('addPlayer', {
          uid, name, job, level, hp, mp, ownerid
        })
      } else if(type === 4) {
        // if(uid && uid.startsWith('4')) return

        const [ uid, name ] = payload
        commit('removePlayer', {
          uid, name
        })
      } */ else if(type === 11) {
        commit('setParty', payload.slice(1, -1))
      }
    }
  },
  namespaced: true
}

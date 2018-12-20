import Vue from 'vue'
import Vuex from 'vuex'

const resolveOwner = function resolveOwner(_) {
  let o = /^.+? \((.+?)\)$/.exec(_)
  return o && o[1] || undefined
}

const _state = () => ({
  encounter: {},
  combatants: [],
  allies: {},
  party: [],
  topdps: 0,
  active: false,
  username: null,
  uid: null
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
      return state.combatants.findIndex(_ => _.name === 'YOU' || _.name === rootState.settings.my_name) + 1
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
    setCombatants(state, combatants) {
      let players = {}
      // const containsYou = combatants.some(_ => _.name === 'YOU')

      for(let k in combatants) {
        let c = combatants[k]
        if(!c.Job) {
          if(c.name === 'Limit Break') {
            c.Job = 'limit-break'
            c.name = c.swings === '1' && c.maxhit? c.maxhit.split('-')[0] : 'Limit Break'
          } else {
            continue
          }
        }

        const [ dskill, damount ] = c.maxhit.split('-')
        const [ hskill, hamount ] = c.maxheal.split('-')
        const o = {
          job:                c.Job.toLowerCase(),
          name:               c.name,
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
        players[k] = o
      }

      for(let name in players) {
        let owner = resolveOwner(name.replace('히비야', 'YOU')) // FIXME
        if(owner && players[owner]) {
          let ownerData = players[owner] || {}
          let petData = players[name]

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

          delete players[name]
        }
      }

      // TODO: merge
      players = Object.keys(players).map(_ => players[_]).sort((a, b) => b.dps - a.dps)

      state.topdps = players[0]? players[0].dps : 0

      Vue.set(state, 'combatants', players)
    },
    setName(state, [ uid, name ]) {
      state.uid = uid
      state.username = name
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
    update({ commit, dispatch }, { Encounter, Combatant }) {
      commit('setEncounter', Encounter)
      commit('setCombatants', Combatant)
    },
    logline({ commit, dispatch }, { type, payload }) {
      if(type === 2) {
        console.log('02', payload)
        // register my name
        commit('setName', payload)

      } else if(type === 3) {

        console.log('03', payload)
        const [ uid, name, job, level, hp, mp, ownerid ] = payload
        console.log(uid, name)

        if(uid && uid.startsWith('4') && ownerid === '0') return
        commit('addPlayer', {
          uid, name, job, level, hp, mp, ownerid
        })

      } else if(type === 4) {
        // TODO: consider pet
        if(uid && uid.startsWith('4')) return

        console.log('04', payload)
        const [ uid, name ] = payload
        commit('removePlayer', {
          uid, name
        })
      } else if(type === 11) {
        console.log('11', payload)
        commit('setParty', payload.slice(1, -1))
      }
    }
  },
  namespaced: true
}

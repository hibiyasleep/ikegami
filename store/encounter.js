import Vue from 'vue'

// pet name to internal icon id mapping, for mark correct 'job' for unmerged pets.
// this mapping isn't really necessary.
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
  // TODO: add shadowbringers support
}

const VALID_PLAYER_JOBS = [
  'GLA', 'GLD', 'MRD', 'PUG', 'PGL', 'LNC', 'ROG', 'ARC', 'THM', 'ACN', 'CNJ',
  'PLD', 'WAR', 'MNK', 'DRG', 'NIN', 'BRD', 'BLM', 'SMN', 'SCH', 'WHM', 'DRK',
  'MCH', 'AST', 'SAM', 'RDM', 'BLU', 'GNB', 'DNC', 'RPR', 'SGE',
  'CRP', 'BSM', 'ARM', 'GSM', 'LTW', 'WVR', 'ALC', 'CUL', 'MIN', 'BTN', 'FSH'
]

const resolveJobFromName = function resolveJobFromName(_job = '', _name) {
  const o = /^(.+?) \((.+?)\)$/.exec(_name)
  if(!o) {
    if(_name === 'Limit Break' || _name === '리미트 브레이크') {
      return ['limit-break', 'Limit Break', false]
    } else {
      return [_job.toLowerCase(), _name, false]
    }
  } else if(_job) {
    return [_job.toLowerCase(), o[1], false]
  } else {
    o[0] = PET_MAPPING[o[1]] || 'chocobo'
    return o
  }
}

const _state = () => ({
  encounter: {},
  combatants: [],
  allies: {},
  topdps: 1,
  tophps: 1,
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
    setCombatants(state, { combatants, playerNames = [] }) {
      let players = {}
      // const containsYou = combatants.some(_ => _.name === 'YOU')

      for(let k in combatants) {
        let c = combatants[k]
        const [
          _job,
          _name,
          _owner
        ] = resolveJobFromName(c.Job, c.name)

        if(!_job) {
          continue
        }

        const [ dskill = '---', damount = '0' ] = c.maxhit.split('-')
        const [ hskill = '---', hamount = '0' ] = c.maxheal.split('-')
        const o = {
          job:                _job,
          name:               _name,
         _name:               c.name, // used by object keying
         _owner:              _owner,
          dps:     parseFloat(c.encdps),
          dps1m:   parseFloat(c.Last60DPS),
          dpspct:             c['damage%'],
          maxhit:  [ parseInt(damount.replace(/[^0-9]/g, '')), dskill ],
          swings:    parseInt(c.swings),
          miss:      parseInt(c.misses),
          cdh:       parseInt(c.CritDirectHitCount),
          ch:        parseInt(c.crithits),
          dh:        parseInt(c.DirectHitCount),
          hps:     parseFloat(c.enchps),
          healed:    parseInt(c.healed),
          maxheal: [ parseInt(hamount.replace(/[^0-9]/g, '')), hskill ],
          ohpct:              0, // post-calculated
          oh:        parseInt(c.overHeal),
          shield:    parseInt(c.damageShield),
          absorb:    parseInt(c.absorbHeal),
          deaths:    parseInt(c.deaths),
          minion_total: 0,
          minion_over: 0
        }

        // override name with maxhit/heal skillname when LMB used once
        if(o.job === 'limit-break' && (
           o.swings === 1 ||
           o.maxheal[0] === o.healed
        )) {
          o.name = dskill || hskill || o.name
        }

        players[o._name] = o
      }

      for(let index in players) {
        const player = players[index]
        let { job, _owner: owner } = player
        const isValidPet = VALID_PLAYER_JOBS.indexOf(job) === -1

        let isYourMinion = playerNames.indexOf(owner)
        if(isYourMinion !== -1) {
          if(players.YOU) {
            owner = 'YOU'
          } else {
            owner = playerNames[isYourMinion]
          }
        }

        // identified as pet + is valid + its owner exists
        if(owner && isValidPet && players[owner]) {
          let ownerData = players[owner] || {}
          let petData = players[index]

          for(let k in ownerData) {
            let old = ownerData[k]
            let pet = petData[k]

            switch(k) {
              case 'job':
              case 'name':
                ownerData[k] = old
                break

              case 'maxhit':
              case 'maxheal':
                ownerData[k] = old[0] >= pet[0]? old : pet
                break

              case 'healed':
                ownerData[k] += pet
                ownerData.minion_heal = pet
                break

              case 'oh':
                ownerData[k] += pet
                ownerData.minion_over = pet
                break

              case 'deaths': // don't merge death count
              case 'dpspct': // this is string, provided as-is from ACT
                break

              default:
                ownerData[k] = (old + pet) || 0
            }
          }

          delete players[index] // merge done
        }
      }

      // post-recalculations
      for(let k in players) {
        const o = players[k]

        // crit direct hits are also counted indiviually as crits and directs
        o.ch -= o.cdh
        o.dh -= o.cdh

        o.critcounts = [ o.dh, o.ch, o.cdh ]

        o.ohpct = o.oh / o.healed || 0
      }

      players = Object.keys(players).map(_ => players[_]).sort((a, b) => b.dps - a.dps)

      state.topdps = players[0]? players[0].dps : 0
      state.tophps = Math.max.apply(null, players.map(_ => _.hps))

      Vue.set(state, 'combatants', players)
    },
    setActive(state, isActive) {
      state.active = isActive
    }
  },
  actions: {
    // Listeners
    update({ commit, rootGetters }, { Encounter, Combatant, isActive }) {
      if(!Encounter || Encounter.hits < 1) {
        return
      }
      commit('setEncounter', Encounter)
      commit('setCombatants', {
        combatants: Combatant,
        playerNames: rootGetters['settings/usernames']
      })
      commit('setActive', isActive)
    },
    logline({ commit }, { type, payload }) {
      switch(type) {
        case 2:
          // register my name
          commit('settings/setName', payload, { root: true })
          break

        // case 3:
        //   const [ uid, name, job, level, hp, mp, ownerid ] = payload
        //   if(uid && uid.startsWith('4') && ownerid === '0') return
        //   commit('addPlayer', { uid, name, job, level, hp, mp, ownerid })
        //   break
        //
        // case 4:
        //   // if(uid && uid.startsWith('4')) return
        //   const [ uid, name ] = payload
        //   commit('removePlayer', { uid, name })
        //   break
        // case 11:
        //   commit('setParty', payload.slice(1, -1))
        //   break

      }
    }
  },
  namespaced: true
}

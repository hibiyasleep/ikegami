export const CELL_DISPLAY_SELECTIONS = {
  dps: 'DPS',
  dps1m: '(1min) DPS',
  dpspct: 'DPS %',
  swings: 'Swings',
  critcounts: 'Crits',
  critpcts: '(%) Crits',
  hps: 'HPS',
  ohpct: 'Overheal %',
  deaths: 'Deaths'
}

export const ALLOWED_NARROW_CELL_VALUES = [
  'dpspct',
  'ohpct',
  'deaths'
]

export const DUMMY_CELL_DATA = {
  combatant: {
    name: 'Hibiya Inemuri',
    job: 'whm',
    dps: 10065.8,
    dps1m: 20413.6,
    maxhit: [ 138072, 'Afflatus Misery' ],
    swings: 1000,
    dh: 300,
    ch: 200,
    cdh: 100,
    critcounts: '300/200/100',
    hps: 4820000 / 754,
    healed: 4820000,
    maxheal: [ 142525, 'Benediction' ],
    oh: 4820000 * 0.4355,
    shield: 46095,
    minion_total: 0,
    minion_over: 0,
    deaths: 0
  },
  encounter: {
    duration: 754,
    encdps: 60000,
    healed: 11830000
  }
}

export const TICKER_POSITION_SELECTIONS = new Map([
  ['', '×'],
  ['above', '↑'],
  ['top', '⤒'],
  ['bottom', '⤓'],
  ['below', '↓']
])

import VueI18n from 'vue-i18n'

export const messages = {
  en: {
    settings: {
      layout: {
        locale: 'UI Language',
        values: 'Values',
        shortName: 'Shortenize name as',
        firstName: 'Firstname',
        lastName: 'Lastname',
        firstNameShort: 'F.',
        lastNameShort: 'L.',
        nameplate: 'Nameplate',
        hideJobIcon: 'Icon',
        hideName: 'Name',
        sort: 'Sort',
        asc: '▼',
        desc: '▲',
        align: 'Align',
        alignLeft: '←',
        alignCenter: '◯',
        alignRight: '→',
        more: 'More',
        forceInlineShortValues: 'Force singleline with short values',
        reduced: 'Less information on detailed view',
        tickers: 'Tickers',
        tickersDirect: 'direct',
        tickersCrit: 'crit',
        tickersCritDirect: 'crit direct',
        tickersShielded: 'shielded',
        tickersHealed: 'healed',
        tickersOverhealed: 'overhealed',
        tickersDpsCrit: 'Critical hits',
        tickersHealerPct: 'Healed percentages',
        yieldForSubtickers: 'Yield space of main ticker for subtickers',
      },
      appearance: {
        uiScale: 'UI Scale (%)',
        theme: 'Theme',
        themeDefault: 'Default',
        themeMinimal: 'Minimal',
        themeTokyu: 'Tōkyū Ikegami Line',
        themeKeikyu: 'Keikyū Line',
        colorScheme: 'Color Scheme',
        colorSchemeKagerouMaterial: 'kagerou Material',
        colorSchemeMopimopiDefault: 'MopiMopi default',
        colorSchemeAmethyst: 'Amethyst',
        colorSchemeFflogs: '(beta) FFLogs',
        colorSchemeIkegamiByRole3: 'ikegami 3-roles',
        colorSchemeIkegamiByRole5: 'ikegami 5-roles',
        colorSchemeMopimopiByRole: 'MopiMopi 3-roles',
        jobIcons: 'Job Icons',
        jobIconsDefault: 'Default',
        jobIconsMonochrome: 'Monochrome',
        jobIconsLegacy: 'Legacy (Bitmap)',
        bulrName: 'Blur out usernames',
        blurNameTip: 'This can be toggled by left-clicking on username.'
      },
      data: {
        showDecimals: 'Decimal format',
        nameForMerging: 'Name for merging',
        automaticallySet: '(Automatically set)',
        automaticallySetTip1: "If multiple pet (including other's) detected as yours, it'll cause duplication of merging.",
        automaticallySetTip2: 'Name will be automatically detected on ACTWS or recent version of OverlayPlugin. If not, try move to another region.',
      },
      index: {
        layout: 'Layout',
        appearance: 'Appearance',
        data: 'Data',
        about: 'About'
      }
    },
    overlay: {
      dropdown: {
        endEncounter: 'Split Encounter',
        changelog: 'Changelog',
        settings: 'Settings',
        layoutMode: 'Layout Mode'
      },
      layout: {
        title: 'Layout Mode'
      }
    },
    changelog: {
      title: 'Changelog',
      onlyAfterUpdates: 'this will only appear once after update.',
      never: 'Never show this again'
    },
    stats: {
      rdps: 'RDPS',
      rhps: 'RHPS',
      totalDeaths: 'Total Deaths',
      '1m': '1m',
      max: 'Max',
      dps: 'DPS',
      maxhit: 'Max',
      maxheal: 'Max',
      swings: 'Swings',
      critcounts: 'D/!/!!!',
      hps: 'HPS',
      pct: '%',
      overheal: 'Overheal',
      minionHeal: 'By minion',
      shield: 'Shielded',
      deaths: 'Deaths',
      dps1m: '(1min) DPS',
      dpspct: 'DPS %',
      critcounts_wo_direct: 'Crits',
      ohpct: 'Overheal %',
    }
  },
  'zh-CN': {
    settings: {
      layout: {
        locale: '语言',
        values: '要显示的数值',
        shortName: '缩略显示名字',
        firstName: '前半部分',
        lastName: '后半部分',
        firstNameShort: 'F.',
        lastNameShort: 'L.',
        nameplate: '名牌',
        hideJobIcon: '职业图标',
        hideName: '角色名',
        sort: '排序',
        asc: '从高到低',
        desc: '从低到高',
        align: '对齐',
        alignLeft: '左对齐',
        alignCenter: '居中',
        alignRight: '右对齐',
        more: '更多',
        forceInlineShortValues: '强制单行显示短数字',
        reduced: '在细节中简化部分数字',
        tickers: '小数值条',
        tickersDirect: '直击',
        tickersCrit: '暴击',
        tickersCritDirect: '直暴',
        tickersShielded: '盾',
        tickersHealed: '治疗',
        tickersOverhealed: '过量',
        tickersDpsCrit: '直暴',
        tickersHealerPct: '治疗百分比',
        yieldForSubtickers: '为小数值条留出显示空间',
      },
      appearance: {
        uiScale: '缩放百分比',
        theme: '样式',
        themeDefault: '默认',
        themeMinimal: '极简',
        themeTokyu: '池上線',
        themeKeikyu: '京急線',
        colorScheme: '配色',
        colorSchemeKagerouMaterial: 'kagerou',
        colorSchemeMopimopiDefault: 'MopiMopi',
        colorSchemeAmethyst: 'Amethyst',
        colorSchemeFflogs: '(beta) FFLogs',
        colorSchemeIkegamiByRole3: 'ikegami 3职能',
        colorSchemeIkegamiByRole5: 'ikegami 5职能',
        colorSchemeMopimopiByRole: 'MopiMopi 3职能',
        jobIcons: '职业图标样式',
        jobIconsDefault: '默认',
        jobIconsMonochrome: '单色',
        jobIconsLegacy: '遗产（低清）',
        blurName: '模糊显示角色名',
        blurNameTip: '在悬浮窗上单击角色名也可以切换模糊与否。'
      },
      data: {
        showDecimals: '数字显示',
        nameForMerging: '合并数据宠物名字',
        automaticallySet: '(自动检测)',
        automaticallySetTip1: "如果多个宠物都被算成你的，那数据合并可能就会重复。",
        automaticallySetTip2: '在最新版本的 ACTWS 或者悬浮窗插件上都能自动检测，无需手动设置。如果检测不到，可以在游戏中过图之后再看看。',
      },
      index: {
        layout: '布局',
        appearance: '风格',
        data: '数据',
        about: '关于'
      }
    },
    overlay: {
      dropdown: {
        endEncounter: '分段战斗',
        changelog: '更新笔记',
        settings: '设置',
        layoutMode: '布局模式'
      },
      layout: {
        title: '布局模式'
      }
    },
    changelog: {
      title: '更新笔记',
      onlyAfterUpdates: '更新笔记只会在更新后显示一次。',
      never: '不再显示'
    },
    stats: {
      rdps: 'RDPS',
      rhps: 'RHPS',
      totalDeaths: '总死亡次数',
      '1m': '1分钟内',
      max: '最高',
      dps: 'DPS',
      maxhit: '最高伤害',
      maxheal: '最高治疗',
      swings: '攻击次数',
      critcounts: '直/暴/直暴',
      hps: 'HPS',
      pct: '%',
      overheal: '过量',
      minionHeal: '召唤物',
      shield: '盾',
      deaths: '死亡次数',
      dps1m: '1分钟内DPS',
      dpspct: 'DPS%',
      critcounts_wo_direct: '暴击',
      ohpct: '过量%',
    }
  }
}

export default function createI18n() {
  return new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages,
  })
}

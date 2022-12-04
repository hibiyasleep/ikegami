<template>
  <div class="tab-content">
    <!-- 62.5 = 10px = usual zoomout limit -->
    <number
      label="UI Scale (%)"
      :min="62.5"
      :max="300"
      :step="6.25"
      :default="100"
      v-model="ui_scale" />
    <dropdown
      label="Theme"
      empty="Default"
      :selections="new Map([
        [ 'minimal', 'Minimal' ],
        [ 'korail-tgis', 'Korail TGIS' ],
        [ 'tokyu', 'Tōkyū Ikegami Line' ],
        [ 'keikyu', 'Keikyū Line' ]
      ])"
      v-model="theme" />
    <dropdown
      label="Cell Background"
      :selections="new Map([
        [ 'translucent', 'Translucent' ],
        [ 'opaque', 'Opaque' ],
        [ 'tinted', 'Tinted' ]
      ])"
      v-model="cell_background" />
    <dropdown
      label="Color Scheme"
      :selections="new Map([
        [ 'kagerou-material', 'kagerou Material' ],
        [ 'mopimopi-default', 'MopiMopi default' ],
        [ 'amethyst', 'Amethyst' ],
        [ 'fflogs', '(beta) FFLogs' ],
        [ 'ikegami-by-role-3', 'ikegami 3-roles' ],
        [ 'ikegami-by-role-5', 'ikegami 5-roles' ],
        [ 'mopimopi-by-role', 'MopiMopi 3-roles' ]
      ])"
      v-model="color_scheme" />
    <dropdown
      label="Job Icons"
      :selections="new Map([
        [ 'default', 'Default' ],
        [ 'monochrome', 'Monochrome' ],
        [ 'legacy', 'Legacy (Bitmap)' ]
      ])"
      v-model="job_icons" />
    <class-colors />
    <checkbox
      label="Blur out usernames"
      v-model="blur_name" />
    <blockquote>
      This can be toggled by left-clicking on username.
    </blockquote>
    <template v-if="blur_name">
      <checkbox
        label="Don't blur out my name and limit breaks"
        v-model="highlight_self"
        disabled="blur_name" />
    </template>
  </div>
</template>

<script>

import mapStateDynamically from '@/lib/map-state-dynamically.js'

import * as components from './_components.js'

export default {
  components,
  computed: {
    ...mapStateDynamically('settings', [
      'ui_scale',
      'theme',
      'cell_background',
      'color_scheme',
      'job_icons',
      'blur_name',
      'highlight_self',
    ])
  }
}

</script>

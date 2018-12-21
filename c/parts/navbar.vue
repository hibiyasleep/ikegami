<template>
  <nav class="c-navbar-wrapper">
    <div class="location">
      <mark>
        {{ ~~(e.duration / 60) | pad }}:{{ e.duration % 60 | pad }}
      </mark>
      <span v-if="e.zone">
        {{ e.zone }}
      </span>
      <span v-else>
        ikegami {{ version }} '{{ releasename }}'
      </span>
    </div>
    <div class="info">
      <span> {{ rank }}/{{ c.length }} </span>
      <span> {{ e.rdps }}rdps </span>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="button" @click="dropdownOpened = !dropdownOpened">
      <path d="M8,10 l4,4 l4,-4" fill="none" stroke="#fff" />
    </svg>
    <ul class="dropdown" v-if="dropdownOpened" @click="dropdownOpened = false">
      <li @click="endEncounter"> Split Encounter </li>
      <li @click="settings"> Settings </li>
    </ul>
    <detail-wrap>
      <article class="details-group dps">
        <row
          title="RDPS"
          :value="e.rdps | decimal" />
        <row
          title="1m"
          :value="e.dps1m | decimal" />
        <row
          title="Max"
          :value="e.max" />
        <hr />
      </article>

      <article class="details-group healer">
        <row
          title="RHPS"
          :value="e.rhps | decimal" />
        <hr />
      </article>

      <article class="details-group tank">
        <row
          title="Deaths"
          :value="e.deaths" />
      </article>
    </detail-wrap>
  </nav>
</template>

<script>

import { mapState, mapGetters } from 'vuex'

import packageinfo from '../../package.json'

import detailWrap from '../elements/detail/wrap.vue'
import row from '../elements/detail/row.vue'

export default {
  components: {
    detailWrap,
    row
  },
  data: () => ({
    dropdownOpened: false,
    version: packageinfo.version,
    releasename: packageinfo.releasename
  }),
  methods: {
    endEncounter() {
      this.$layer.request('end')
    },
    settings() {
      this.$emit('openSettings')
    }
  },
  computed: {
    ...mapState('encounter', {
      e: 'encounter',
      c: 'combatants'
    }),
    ...mapGetters('encounter', [ 'rank' ])
  }
}

</script>

<style lang="sass">

.c-navbar-wrapper
  display: flex
  position: relative

  width: $ui-width
  height: $nav-height
  margin: 0.5rem auto
  padding: 0 0 0 0.5rem
  line-height: $nav-height

  color: $ui-color
  background: $ui-background
  font-size: $nav-text-size
  text-shadow: $shadow-with-background

  .location
    @include unselectable
    flex-grow: 0
    flex-shrink: 1

    mark
      background: none
      color: lighten($color-theme, 20%)

  .info
    @include unselectable
    flex-grow: 0
    flex-shrink: 0
    margin-left: auto

    > span + span
      border-left: $_1px solid #ddd
      padding-left: 0.25rem

  .button
    width: $nav-height
    height: $nav-height
    filter: drop-shadow($shadow-with-background)

  .dropdown
    position: absolute
    top: $nav-height
    right: 0
    background: $ui-background

    li
      @include clickable
      padding: 0.125rem 0.5rem
      text-align: right

  .c-details
    position: absolute
    top: $nav-height + 0.5rem
    left: 0

    opacity: 0

  .location:hover ~ .c-details
    opacity: 1
</style>

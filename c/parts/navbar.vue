<template>
  <nav :class="[
    'c-navbar-wrapper', {
      'enable-april-fool': aprilFoolEnabled
    }
  ]">
    <div class="location">
      <mark v-if="aprilFoolEnabled && !e.duration">
        IK-07
      </mark>
      <mark v-else>
        {{ ~~(e.duration / 60) | pad }}:{{ (e.duration || 0) % 60 | pad }}
      </mark>
      <span v-if="e.zone">
        {{ e.zone }}
      </span>
      <span v-else-if="aprilFoolEnabled">
        {{ releasename }}
      </span>
      <span v-else>
        ikegami {{ version }} '{{ releasename }}'
      </span>
    </div>
    <div class="info">
      <span> {{ rank }}/{{ c.length }} </span>
      <span> {{ e.rdps || 0 }}rdps </span>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="button" @click="dropdownOpened = !dropdownOpened">
      <path d="M8,10 l4,4 l4,-4" fill="none" stroke="#fff" />
    </svg>
    <ul class="dropdown" v-if="dropdownOpened" @click="dropdownOpened = false">
      <li @click="endEncounter"> Split Encounter </li>
      <li @click="open('changelog')"> Changelog </li>
      <li @click="open('settings')"> Settings </li>
      <li v-if="isAprilFool" @click="toggleAprilFool"> {{ allow_april_fool? 'Disallow' : 'Allow' }} april fool </li>
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
        <!-- <hr /> -->
      </article>

      <!-- <article class="details-group tank">
        <row
          title="Deaths"
          :value="e.deaths" />
      </article> -->
    </detail-wrap>
  </nav>
</template>

<script>

import { mapState, mapGetters, mapMutations } from 'vuex'

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
    ...mapMutations('ui', [ 'open' ]),
    endEncounter() {
      this.$layer.request('end')
    },
    toggleAprilFool() {
      this.$store.commit('settings/set', {
        k: 'allow_april_fool',
        v: !this.allow_april_fool
      })
    }
  },
  computed: {
    ...mapState('encounter', {
      e: 'encounter',
      c: 'combatants'
    }),
    ...mapGetters('encounter', [ 'rank' ]),
    ...mapState('settings', [ 'allow_april_fool' ]),
    isAprilFool() {
      const d = new Date()
      return d.getMonth() === 3 && d.getDate() === 1
    },
    aprilFoolEnabled() {
      return this.isAprilFool && this.allow_april_fool
    }
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
  background: $cell-background
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
    z-index: $z-global-dropdown

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

  &.enable-april-fool
    position: relative
    flex-direction: column
    align-items: stretch
    justify-content: center
    text-align: center
    width: 18rem
    height: 4rem
    padding: 0
    line-height: 1.25rem

    .location
      border-bottom: 0.125rem solid #fff
      padding: 0.25rem 0 0.375rem 0

      mark
        display: inline-block
        align-items: center
        color: #fff !important
        background-color: #EE86A7
        width: 2.75rem
        height: 1.25rem
        margin-right: 0.125rem

    .info
      width: 100%
      border-top: 0.5rem solid #EE86A7
      padding-top: 0.125rem

      > span + span
        border-left: none

        &::before
          content: '・\00a0'

    > .button
      position: absolute
      right: 0
      bottom: 0

    .dropdown
      top: 4rem

</style>

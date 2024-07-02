<template>
  <div class="c-version">
    <p class="justify">
      ikegami {{ version }}
      <span class="spacer"></span>
      '{{ releasename }}'
    </p>
    <svg
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="-2 0 364 24"
      style="width: 22.75rem; height: 1.5rem;">
      <defs>
        <svg:style>
        <!-- <![CDATA[ -->
          .line-toyoko { stroke: #fa1959; } /* #da0442 */
          .line-minato-mirai { stroke: #0067c0; }
          .line-fukutoshin { stroke: #9c5e31; }

          .line-tokaido { stroke: #ffa500; }
          .line-yokosuka { stroke: #0070b9; }
          .line-nambu { stroke: #ffd700; }
          .line-yamanote { stroke: #9acd32; }
          .line-saikyo { stroke: #2e8b57; }
          .line-keihin-tohoku { stroke: #00bfff; }
          .line-yokohama { stroke: #9acd32; }
          .line-shonan-shinjuku { stroke: #ff0000; }

          .line-keikyu { stroke: #00bfff; }
          .line-sotetsu { stroke: #1e90ff; }
          .line-yokohama-green { stroke: #40cc40; }

          .line-meguro { stroke: #009cd2; }
          .line-tamagawa { stroke: #ae0378; }
          .line-oimachi { stroke: #f18c43; }
          .line-den-en-toshi { stroke: #20a288; }

          .line-hibiya { stroke: #b5b5ac; }
          .line-hanzomon { stroke: #9370db; }
          .line-ginza { stroke: #ff9500; }
        <!-- ]]> -->
        </svg:style>
        <clipPath id="adj-clip" clipPathUnits="userSpaceOnUse">
          <path d="M0,8h8v8h-8v-8l-8,-8h24v24h-24v-24" clip-rule="evenodd" />
        </clipPath>
        <path id="station-main" fill="none" class="line-toyoko" stroke-width="2" d="M1,9v6h6v-6z M7,12 h10" />
        <path id="station-stop" fill="none" class="line-toyoko" stroke-width="2" d="M1,9v6h6v-6z" />
        <path id="adj-n" stroke-width="2" d="M4,0v8" />
        <path id="adj-s" stroke-width="2" d="M4,16v8" />
        <path id="adj-ns" stroke-width="2" d="M4,0v8m0,8v8" />
        <path id="adj-w" stroke-width="2" d="M0,12h-8" />
        <path id="adj-e" stroke-width="2" d="M8,12h8" />
        <path id="adj-nw" stroke-width="2" d="M4,12l-10,-10" clip-path="url(#adj-clip)" />
        <path id="adj-ne" stroke-width="2" d="M4,12l10,-10" clip-path="url(#adj-clip)" />
        <path id="adj-sw" stroke-width="2" d="M4,12l-10,10" clip-path="url(#adj-clip)" />
        <path id="adj-se" stroke-width="2" d="M4,12l10,10" clip-path="url(#adj-clip)" />
      </defs>
      <!-- <path opacity="0.25" fill="#20A288" d="M57,16h6.6l4.1,4.1l1.4,-1.4l-4.1,-4.1v-1.6l-2,-1v2h-4v-2l-2,-1z"/> -->

      <g opacity="0.333">
        <g fill="none" stroke-width="1">
          <path d="M22,1.5h-24" class="line-yokosuka" />
          <path d="M22,3h-24" stroke-width="2" class="line-tokaido" />
          <path d="M22,4.5h-12" class="line-yokohama" />
          <path d="M22,5.5h-24" class="line-keihin-tohoku" />
          <path d="M22,21h-24" stroke-width="2" class="line-keikyu" />
        </g>
        <use href="#adj-w" x="4" y="-3" class="line-sotetsu" />
        <use href="#adj-w" x="6" class="line-minato-mirai" />
        <use href="#station-main" x="6" />
        <use href="#station-main" x="23" />
        <use href="#station-main" x="40" />
        <use href="#station-main" x="57" />
        <use href="#station-main" x="74" />
        <use href="#adj-ns" x="91" class="line-yokohama" />
        <use href="#station-main" x="91" />
        <use href="#station-main" x="108" />
        <use href="#station-main" x="125" />

        <use href="#adj-sw" x="142" class="line-meguro" />
        <use href="#adj-s" x="142" class="line-yokohama-green" />
        <path d="M150,14 h9 m8,0 h9 m8,0 h9 m8,0 h9 m8,0 h9 m8,0" stroke-width="2" class="line-meguro" />
        <use href="#station-main" x="142" />
        <use href="#station-main" x="159" />

        <use href="#adj-ns" x="176" class="line-nambu" />
        <use href="#adj-ne" x="176" class="line-yokosuka" />
        <use href="#adj-sw" x="176" class="line-yokosuka" />
        <use href="#station-main" x="176" />
        <use href="#station-main" x="193" />

        <use href="#adj-s" x="210" class="line-tamagawa" />
        <use href="#station-main" x="210" />
        <use href="#adj-ne" x="227" class="line-meguro" />

        <use href="#station-main" x="227" />
      </g>

      <use href="#adj-ns" x="244" class="line-oimachi" />
      <use href="#station-main" x="244" />
      <use href="#station-main" x="261" />
      <use href="#station-main" x="278" />
      <use href="#station-main" x="295" />
      <use href="#station-stop" x="312" />
      <use href="#adj-se" x="312" class="line-hibiya" />
      <use href="#station-main" x="312" />
      <use href="#station-stop" x="329" />

      <g opacity="0.333">

        <use href="#station-main" x="329" />

        <use href="#adj-e" x="346" class="line-fukutoshin" />
        <use href="#adj-ns" x="345" class="line-yamanote" />
        <use href="#adj-ns" x="347" class="line-saikyo" />
        <use href="#adj-w" x="348" y="-3" class="line-den-en-toshi" />
        <use href="#adj-e" x="346" y="-3" class="line-hanzomon" />
        <use href="#adj-e" x="348" y="3" class="line-ginza" />
        <use href="#station-stop" x="346" />
      </g>
    </svg>
  </div>
</template>

<script>

import packageinfo from '@/package.json'

export default {
  data: () => ({
    version: packageinfo.version,
    releasename: packageinfo.releasename
  })
}

</script>

<style lang="sass">

.c-version
  @include unselectable
  flex-wrap: wrap

  p
    display: flex
    margin: 0.5rem 0 0.25rem 0

  > svg
    display: block
    margin: 0 auto

  &.without-version-number > .justify
    display: none

.window-wrap > .c-version
  padding: 0.5rem 0.75rem 0.5rem 1rem

  svg
    margin: 0 auto
</style>

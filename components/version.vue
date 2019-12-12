<template>
  <p class="justify c-version">
    ikegami {{ version }}
    <span class="spacer"></span>
    '{{ releasename }}'<br />
    <svg xmlns="http://www.w3.org/2000/svg" width="360" height="24">
      <path opacity="0.25" fill="#20A288" d="M0,12h8v3h11v2h-11v3h-8l2,-2h4v-4h-4v4l-2,2z"/>
      <path opacity="0.25" fill="#20A288" d="M19,12h8v3h11v2h-11v3h-8l2,-2h4v-4h-4v4l-2,2z"/>
      <path opacity="0.25" fill="#20A288" d="M38,12h8v3h11v2h-11v3h-8l2,-2h4v-4h-4v4l-2,2z"/>
      <path opacity="0.25" fill="#20A288" d="M57,12h8v6.6l4.1,4.1l-1.4,1.4l-4.1,-4.1h-6.6l2,-2h4v-4h-4v4l-2,2z"/>
      <path opacity="0.25" fill="#FFA500" d="M0,4h8v3h49v2h-49v3h-8v-8h8l-2,2h-4v4h4v-4l2,-2z"/>
      <path opacity="0.25" fill="#FFA500" d="M57,4h8v3h4l4,4h3v1h-5l-3,-3h-3v3h-8l2,-2h4v-4h-4v4l-2,2z"/>
      <path opacity="0.25" fill="#FFA500" d="M65,17h4l4,-4h3v-1h-5l-3,3h-3z"/>
      <path opacity="0.25" fill="#FFA500" d="M76,8h8v3h11v2h-11v3h-8v-8h8l-2,2h-4v4h4v-4l2,-2z"/>
      <path opacity="0.25" fill="#FFA500" d="M95,8h8v3h11v2h-11v3h-8v-8h8l-2,2h-4v4h4v-4l2,-2z"/>
      <path opacity="0.25" fill="#FFA500" d="M114,8h8v3h11v2h-11v3h-8v-8h8l-2,2h-4v4h4v-4l2,-2z"/>
      <path opacity="0.25" fill="#FFA500" d="M133,8h8v3h11v2h-11v3h-8v-8h8l-2,2h-4v4h4v-4l2,-2z"/>
      <path opacity="0.25" fill="#FFA500" d="M152,8h8v3h11v2h-11v3h-8v-8h8l-2,2h-4v4h4v-4l2,-2z"/>
      <path opacity="0.25" fill="#FFA500" d="M171,8h8v3h11v2h-11v3h-8v-8h8l-2,2h-4v4h4v-4l2,-2z"/>
      <!-- toyoko | | -->
      <path opacity="0.25" fill="#DA0442" d="M174,8V0h2v8zm0,8h2v8h-2z" />
      <path opacity="0.25" fill="#FFA500" d="M190,8h8v3h11v2h-11v3h-8v-8h8l-2,2h-4v4h4v-4l2,-2z"/>
      <path opacity="0.25" fill="#FFA500" d="M209,8h8v3h11v2h-11v3h-8v-8h8l-2,2h-4v4h4v-4l2,-2z"/>
      <!-- meguro / / -->
      <path opacity="0.25" fill="#009CD2" d="M217,8h-1.4l8,-8l1.4,1.4l-8,8z m-8,8 h1.4 l-8,8 l-1.4,-1.4 l8,-8 z" />
      <path opacity="1.00" fill="#FFA500" d="M228,8h8v3h11v2h-11v3h-8v-8h8l-2,2h-4v4h4v-4l2,-2z"/>
      <path opacity="1.00" fill="#FFA500" d="M247,8h8v8h-8v-8h8l-2,2h-4v4h4v-4l2,-2z"/>
      <!-- ikegami / / -->
      <path opacity="0.25" fill="#FC73A3" d="M255,8h-1.4l8,-8l1.4,1.4l-8,8z" />
      <path opacity="1.00" fill="#FC73A3" d="M247,16 h1.4 l-8,8 l-1.4,-1.4 l8,-8 z" />
      <path opacity="0.25" fill="#FFA500" d="M266,8h8v8h-8v-3h-11v-2h11v-3h8l-2,2h-4v4h4v-4l2,-2z"/>
      <path opacity="0.25" fill="#FFA500" d="M285,8h8v8h-8v-3h-11v-2h11v-3h8l-2,2h-4v4h4v-4l2,-2z"/>
      <!-- asakusa / / -->
      <path opacity="0.25" fill="#EC6E65" d="M293,8h-1.4l8,-8l1.4,1.4l-8,8z m-8,8 h1.4 l-8,8 l-1.4,-1.4 l8,-8 z" />
      <path opacity="0.25" fill="#FFA500" d="M304,8h8v8h-8v-3h-11v-2h11v-3h8l-2,2h-4v4h4v-4l2,-2z"/>
      <path opacity="0.25" fill="#FFA500" d="M323,8h8v8h-8v-3h-11v-2h11v-3h8l-2,2h-4v4h4v-4l2,-2z"/>
      <path opacity="0.25" fill="#FFA500" d="M342,8h8v8h-8v-3h-11v-2h11v-3h8l-2,2h-4v4h4v-4l2,-2z"/>
      <!-- rinkai \ - -->
      <path opacity="0.25" fill="#00B48D" d="M342,8h1.4l-8,-8l-1.4,1.4l8,8z m8,3h10v2h-10z" />
      <!-- keihin tohoku | | -->
      <path opacity="0.25" fill="#00BFFF" d="M345,0v8h2v-8z m0,16v8h2v-8z" />
      <!-- <path opacity="0.25" fill="#FFA500" d="M214,18v2h-1.6l-9-9H200v2h3l9,9h2v2h10v-6H214z M222,22h-6v-2h6V22z"/> -->
    </svg>

  </p>
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
  flex-wrap: wrap

  > span
    flex-grow: 1

.window-wrap > .c-version
  padding: 0 0.75rem 0 1rem

  svg
    margin: 0.5rem auto
</style>

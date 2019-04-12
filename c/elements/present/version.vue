<template>
  <p class="justify c-version">
    ikegami {{ version }}
    <span class="spacer"></span>
    '{{ releasename }}'<br />
    <svg xmlns="http://www.w3.org/2000/svg" width="344" height="24">
      <path opacity="0.25" fill="#FC73A3" d="M0,8h8v3h16v2h-16v3h-8V8h16z M2,14h4v-4H2V14z"/>
      <!-- yamanote / | -->
      <path opacity="0.25" fill="#9ACD32" d="M8,8h-1.4l8,-8l1.4,1.4l-8,8z m-5,8v8h2v-8z" />
      <!-- asakusa | \-->
      <path opacity="0.25" fill="#EC6E65" d="M3,8v-8h2v8z m5,6.6 v1.4h-1.4 l8,8 l1.4,-1.4 l-8,-8 z" />
      <path opacity="0.25" fill="#FC73A3" d="M24,8h8v3h16v2h-16v3h-8V8h8l-2,2h-4v4h4v-4l2,-2z"/>
      <path opacity="0.25" fill="#FC73A3" d="M48,8h8v3h16v2h-16v3h-8V8h8l-2,2h-4v4h4v-4l2,-2z"/>
      <path opacity="0.25" fill="#FC73A3" d="M72,8h8v3h16v2h-16v3h-8V8h8l-2,2h-4v4h4v-4l2,-2z"/>
      <!-- oimachi / / -->
      <path opacity="0.25" fill="#FFA500" d="M104,8h-1.4l8,-8l1.4,1.4l-8,8z m-8,8 h1.4 l-8,8 l-1.4,-1.4 l8,-8 z" />
      <path opacity="0.25" fill="#FC73A3" d="M96,8h8v3h16v2h-16v3h-8V8h8l-2,2h-4v4h4v-4l2,-2z"/>
      <path opacity="0.25" fill="#FC73A3" d="M120,8h8v3h16v2h-16v3h-8V8h8l-2,2h-4v4h4v-4l2,-2z"/>
      <path opacity="1.00" fill="#FC73A3" d="M144,8h8v3h16v2h-16v3h-8V8h8l-2,2h-4v4h4v-4l2,-2z"/>
      <path opacity="1.00" fill="#FC73A3" d="M168,8h8v3h16v2h-16v3h-8V8h8l-2,2h-4v4h4v-4l2,-2z"/>
      <path opacity="1.00" fill="#FC73A3" d="M192,8h8v3h16v2h-16v3h-8V8h8l-2,2h-4v4h4v-4l2,-2z"/>
      <path opacity="1.00" fill="#FC73A3" d="M216,8h8v3h16v2h-16v3h-8V8h8l-2,2h-4v4h4v-4l2,-2z"/>
      <path opacity="1.00" fill="#FC73A3" d="M240,8h8v3h16v2h-16v3h-8V8h8l-2,2h-4v4h4v-4l2,-2z"/>
      <path opacity="1.00" fill="#FC73A3" d="M264,8h8v3h16v2h-16v3h-8V8h8l-2,2h-4v4h4v-4l2,-2z"/>
      <path opacity="1.00" fill="#FC73A3" d="M288,8h8v3h16v2h-16v3h-8V8h8l-2,2h-4v4h4v-4l2,-2z"/>
      <path opacity="1.00" fill="#FC73A3" d="M312,8h8v3h16v2h-16v3h-8V8h8l-2,2h-4v4h4v-4l2,-2z"/>
      <path opacity="1.00" fill="#FC73A3" d="M336,8h8v8h-8v-8l2,2v4h4v-4h-4z"/>
      <!-- tamagawa / -->
      <path opacity="1.00" fill="#AE0378" d="M336,16h1.4l-8,8l-1.4,-1.4l8,-8z" />
      <!-- keihin tohoku | | -->
      <path opacity="1.00" fill="#00BFFF" d="M339,0v8h2v-8z m0,16v8h2v-8z" />
      <!-- <path opacity="0.25" fill="#FC73A3" d="M214,18v2h-1.6l-9-9H200v2h3l9,9h2v2h10v-6H214z M222,22h-6v-2h6V22z"/> -->
    </svg>
  </p>
</template>

<script>

import packageinfo from '../../../package.json'

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

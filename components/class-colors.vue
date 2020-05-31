<template>
  <p class="color-scheme-demo">
    <span class="icon class-pld"><span class="ticker"> </span></span>
    <span class="icon class-war"><span class="ticker"> </span></span>
    <span class="icon class-drk"><span class="ticker"> </span></span>
    <span class="icon class-gnb"><span class="ticker"> </span></span>
    <span class="icon class-mnk"><span class="ticker"> </span></span>
    <span class="icon class-drg"><span class="ticker"> </span></span>
    <span class="icon class-nin"><span class="ticker"> </span></span>
    <span class="icon class-sam"><span class="ticker"> </span></span>
    <span class="icon class-brd"><span class="ticker"> </span></span>
    <span class="icon class-mch"><span class="ticker"> </span></span>
    <span class="icon class-dnc"><span class="ticker"> </span></span>
    <span class="icon class-smn"><span class="ticker"> </span></span>
    <span class="icon class-blm"><span class="ticker"> </span></span>
    <span class="icon class-rdm"><span class="ticker"> </span></span>
    <span class="icon class-blu"><span class="ticker"> </span></span>
    <span class="icon class-whm"><span class="ticker"> </span></span>
    <span class="icon class-sch"><span class="ticker"> </span></span>
    <span class="icon class-ast"><span class="ticker"> </span></span>
  </p>
</template>

<style lang="sass">

.color-scheme-demo.color-scheme-demo
  display: flex
  justify-content: center
  height: 2rem
  line-height: 2rem
  // text-shadow: $shadow-text-background

  > span
    position: relative
    flex-grow: 1
    height: 100%
    text-indent: 0

  .icon::before
    position: absolute

  .ticker
    display: inline-block
    width: 100%
    height: 100%

.c-settings-group-content .color-scheme-demo
  margin-left: -1rem

</style>

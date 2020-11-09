<template>
  <div id="app">
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeIn"
    >
      <router-view />
    </transition>
  </div>
</template>

<script>
window.addEventListener('unload',e => {
  window.scroll(0,0)
})
export default {
  name: "App"
};
</script>

<style>
</style>

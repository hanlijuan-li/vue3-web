<template>
  <div class="tool-bar-lf">
    <CollapseIcon></CollapseIcon>
    <Breadcrumb></Breadcrumb>
  </div>
</template>
<script setup lang='ts'>
import CollapseIcon from "./components/CollapseIcon.vue";
import Breadcrumb from './components/Breadcrumb.vue'
</script>
<style scoped lang="scss">
  .tool-bar-lf {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
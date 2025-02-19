<template>
  <div class="tool-bar-ri">
    <div class="header-icon">
      <Language></Language>
    </div>
    <span class="username">{{username}}</span>
    <Avatar />
  </div>
</template>
<script setup lang="ts">
import Language from './components/Language.vue'
import {useUserStore} from "@/stores/modules/user";
import {computed} from "vue";
import Avatar from './components/Avatar.vue'

const userStore = useUserStore()
const username = computed(() => userStore.userInfo.name)
</script>
<style lang="scss" scoped>
.tool-bar-ri {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 25px;
  .header-icon {
    display: flex;
    align-items: center;
    & > * {
      margin-left: 21px;
    }
  }
  .username {
    margin: 0 20px;
    font-size: 15px;
  }
}
</style>
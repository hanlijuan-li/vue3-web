<!--纵向布局-->
<template>
  <el-container class="layout">
    <el-aside>
      <div
        class="aside-box"
        :style="{ width: globalStore.isCollapse ? '65px' : '210px' }"
      >
        <div class="logo flx-center">
          <img class="logo-img" src="@/assets/logo.svg" alt="logo" />
          <span v-show="!globalStore.isCollapse" class="logo-text">{{
            title
          }}</span>
        </div>
        <el-scrollbar>
          <el-menu
            :router="false"
            :default-active="activeMenu"
            :collapse="globalStore.isCollapse"
            unique-opened
            :collapse-transition="false"
          >
            <SubMenu :menu-list="menuList"></SubMenu>
          </el-menu>
        </el-scrollbar>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <ToolBarLeft></ToolBarLeft>
        <ToolBarRight></ToolBarRight>
      </el-header>
    </el-container>
  </el-container>
</template>
<script setup lang='ts'>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/modules/auth";
import { useGlobalStore } from "@/stores/modules/global";
import SubMenu from "../components/Menu/SubMenu.vue";
import ToolBarLeft from "../components/Header/ToolBarLeft.vue";
import ToolBarRight from "../components/Header/ToolBarRight.vue"

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const globalStore = useGlobalStore();
// const isCollapse = ref(false);

const title = import.meta.env.VITE_GLOBAL_APP_TITLE;

const activeMenu = computed(
  () => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string
);

const menuList = authStore.showMenuListGet;
console.log("menuList", menuList);

const handleClickMenu = (subItem) => {
  router.push(subItem.path);
};
</script>
<style scoped lang="scss">
// @import "./index.scss";
@use "./index.scss" as *;
</style>
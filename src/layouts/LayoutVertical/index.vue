<!--纵向布局-->
<template>
  <el-container class="layout">
    <el-aside>
      <div class="aside-box">
        <div class="logo flx-center">
          <img class="logo-img" src="@/assets/logo.svg" alt="logo" />
          <span class="logo-text">{{ title }}</span>
        </div>
        <el-scrollbar>
          <el-menu :router="false" :default-active="activeMenu">
            <template v-for="subItem in menuList" :key="subItem.path">
              <el-sub-menu :index="subItem.path">
                <template #title>
                  <!-- 父级菜单的名称放在这里 -->
                  <span>{{ subItem.name }}</span>
                </template>
                <!-- 如果有子菜单，下面可以继续添加子菜单项 -->
                <el-menu-item
                  v-for="childItem in subItem.children"
                  :key="childItem.path"
                  :index="childItem.path"
                  @click="handleClickMenu(childItem)"
                >
                  {{ childItem.name }}
                </el-menu-item>
              </el-sub-menu>
            </template>
          </el-menu>
          <!-- <el-menu :router="false" :default-active="activeMenu">
            <template v-for="subItem in menuList" :key="subItem.path">
              <el-sub-menu :index="subItem.path">
                <span>{{ subItem.name }}</span>
              </el-sub-menu>
            </template>
          </el-menu> -->
        </el-scrollbar>
      </div>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script setup lang='ts'>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/modules/auth";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const title = import.meta.env.VITE_GLOBAL_APP_TITLE;

const activeMenu = computed(
  () => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string
);

const menuList = authStore.showMenuListGet;

const handleClickMenu = (subItem) => {
  router.push(subItem.path);
};
</script>
<style scoped lang="scss">
// @import "./index.scss";
@use "./index.scss" as *;
</style>
<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children?.length" :index="subItem.path">
      <template #title>
        <el-icon v-if="subItem.meta.icon">
          <component :is="subItem.meta.icon"></component>
        </el-icon>
        <span>{{ subItem.meta.title }}</span>
      </template>
      <SubMenu :menu-list="subItem.children"></SubMenu>
    </el-sub-menu>
    <el-menu-item
      v-else
      :index="subItem.path"
      @click="handleClickMenu(subItem)"
    >
      <el-icon v-if="subItem.meta.icon">
        <component :is="subItem.meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ subItem.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>
<script setup lang="ts">
import router from "@/router/index";

defineProps<{ menuList: Menu.MenuOptions[] }>();

const handleClickMenu = (subItem: Menu.MenuOptions) => {
  if (subItem.meta.isLink)
    return window.open(subItem.meta.isLink + "", "_blank");

  router.push(subItem.path);
};
</script>
<style lang="scss">
.el-menu--collapse {
  .is-active {
    .el-sub-menu__title {
      color: #ffffff !important;
      background-color: var(--el-color-primary) !important;
    }
  }
}
.el-menu-item {
  &:hover {
    color: #333333;
  }
  &.is-active {
    color: var(--el-menu-active-color) !important;
    background-color: var(--el-color-primary-light-9) !important;
    &::before {
      left: 0;
      position: absolute;
      top: 0;
      bottom: 0;
      width: 4px;
      content: "";
      background-color: var(--el-color-primary);
    }
  }
}
</style>
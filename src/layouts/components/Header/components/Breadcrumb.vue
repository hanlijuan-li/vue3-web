<template>
  <div
    :class="[
      'breadcrumb-box mask-image',
      !globalStore.breadcrumbIcon && 'no-icon',
    ]"
  >
    <el-breadcrumb :separator-icon="ArrowRight">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item
          v-for="(item, index) in breadcrumbList"
          :key="item.path"
        >
          <div
            class="el-breadcrumb__inner is-link"
            :class="{ 'item-no-icon': !item.meta.icon }"
          >
            <el-icon
              v-if="item.meta.icon && globalStore.breadcrumbIcon"
              class="breadcrumb-icon"
            >
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span class="breadcrumb-title">{{ item.meta.title }}</span>
          </div>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>
<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";
import { useAuthStore } from "@/stores/modules/auth";
import { useGlobalStore } from "@/stores/modules/global";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const authStore = useAuthStore();
const globalStore = useGlobalStore();

const breadcrumbList = computed(() => {
  let breadcrumbData =
    authStore.breadcrumbListGet[route.matched[route.matched.length - 1].path] ??
    [];
  return breadcrumbData;
});

console.log("breadcrumbList", breadcrumbList);
</script>
<style scoped lang="scss">
.breadcrumb-box {
  display: flex;
  align-items: center;
  overflow: hidden;
  .el-breadcrumb {
    white-space: nowrap;
    .el-breadcrumb__item {
      position: relative;
      display: inline-block;
      float: none;
      .el-breadcrumb__inner {
        display: inline-flex;
        &.is-link {
          color: #606266;
          &:hover {
            color: var(--el-color-primary);
          }
        }
        .breadcrumb-icon {
          margin-top: 1px;
          margin-right: 6px;
          font-size: 16px;
        }
        .breadcrumb-title {
          margin-top: 2px;
        }
      }
      &:last-child .el-breadcrumb__inner,
      &:last-child .el-breadcrumb__inner:hover {
        color: #606266;
      }
    }
  }
}
</style>

<template>
<el-dropdown trigger="click">
  <div class="avatar">
    <img src="@/assets/images/avatar.gif" alt="avatar">
  </div>
  <template #dropdown>
    <el-dropdown-menu>
      <el-dropdown-item>
        <el-icon><User/></el-icon>{{ $t("header.personalData") }}
      </el-dropdown-item>
      <el-dropdown-item>
        <el-icon><Edit/></el-icon>{{$t('header.changePassword')}}
      </el-dropdown-item>
      <el-dropdown-item divided>
        <el-icon><SwitchButton/></el-icon>{{$t('header.logout')}}
      </el-dropdown-item>
    </el-dropdown-menu>
  </template>
</el-dropdown>
</template>

<script setup lang="ts">

import {Edit, SwitchButton} from "@element-plus/icons-vue";
</script>

<style lang="scss" scoped>
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
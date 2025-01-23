<template>
  <div>index page...</div>
  <el-button type="primary" @click="login">登录成功</el-button>
</template>
<script setup lang="ts">
import router from "@/router/index";

const login = () => {
  router.push("/home/index");
};
</script>

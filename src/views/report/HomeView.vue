<script setup lang="ts">
import {
  testAuth,
  testMockio,
  testMockoon,
  downloadFile,
} from "@/api/modules/login";
import { log } from "console";
import { onMounted } from "vue";
import { ElMessage } from "element-plus";

const simulate401 = () => {
  testMockio().then((res) => {
    console.log(res);
  });
};

const mockoon = () => {
  testMockoon()
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      ElMessage.error({
        message: error.message,
      });
    });
};

const download = () => {
  downloadFile();
};
</script>

<template>
  <h1>Home view</h1>
  <br />
  <el-button type="primary" @click="simulate401">模拟 401</el-button>
  <el-button type="primary" @click="mockoon">模拟 mockoon</el-button>
  <el-button type="primary" @click="download">模拟 downloadFile</el-button>
</template>

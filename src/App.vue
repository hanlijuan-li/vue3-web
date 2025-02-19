<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {computed, onMounted} from "vue";
import {useGlobalStore} from "@/stores/modules/global";
import {getBrowerLang} from "@/utils";
import {LanguageType} from "@/stores/interface";
import en from "element-plus/es/locale/lang/en";
import zhCn from "element-plus/es/locale/lang/zh-cn";

const globalStore = useGlobalStore()

const i18n = useI18n()
onMounted(() => {
  const language = globalStore.language ?? getBrowerLang()
  i18n.locale.value = language
  globalStore.setGlobalState('language', language as LanguageType)
})

// element language
const locale = computed(() => {
  if (globalStore.language === 'zh') return zhCn
  if (globalStore.language === 'en') return en
  return getBrowerLang() === 'zh' ? zhCn : en
})
</script>

<style scoped>
</style>

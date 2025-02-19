import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import '@/style/common.scss'
import "@/assets/iconfont/iconfont.scss"

import App from './App.vue'
import router from './router'

import '@/api/mockjs'

import i18n from '@/language/index'

const app = createApp(App)

// 从 @element-plus/icons-vue 中导入所有图标并进行全局注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(i18n)

app.use(ElementPlus).use(i18n).use(router).use(createPinia()).mount('#app')

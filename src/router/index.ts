import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { staticRouter, errorRouter } from './modules/staticRouter'
import { initDynamicRouter } from './modules/dynamicRouter'
import { useAuthStore } from '@/stores/modules/auth'
import { ROUTER_WHITE_LIST } from '@/config'
import eventEmitter from '@/utils/eventEmitter'
import { ElMessage } from "element-plus";

const mode: 'hash'|'history' = import.meta.env.VITE_ROUTER_MODE

const routerMode = {
  hash: () => createWebHashHistory(),
  history: () => createWebHistory()
}

const router = createRouter({
  history: routerMode[mode](),
  routes: [...staticRouter, ...errorRouter],
  strict: false
})

// 获取Vue 实例
// const app = router.app


router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // 判断访问页面是否在路由白名单地址中，如果存在直接放行
  if (ROUTER_WHITE_LIST.includes(to.path)) return next()

  // 判断 authMenu 是否有值，如果没有则请求菜单列表并初始化动态路由
  if (!authStore.authMenuListGet.length) {
    await initDynamicRouter()
    return next({...to, replace: true})
  }

  // 如果不在白名单且没有权限，跳转到403页面  
  if (!authStore.flatMenuListGet.some(item => to.path === item.path)) {    
    return next('/403')
  }

  next()
})

eventEmitter.on('API:UN_AUTH', () => {  
  router.push('/login')
})
eventEmitter.on('API:BAD_REQUEST', (err: any) => { 
  console.log('bad request', err);
  const errorMessage = err.message || '请求参数错误，请联系系统管理员'
  const fieldErrors = err.errors
  

  if (fieldErrors) {
    for (const [field, msg] of Object.entries(fieldErrors)) {
      ElMessage.error({ message: `${field}: ${msg}` })
    }
  } else {
    ElMessage.error({ message: errorMessage })
  }
})

eventEmitter.on('API:FORBIDDEN', () => {
  ElMessage.error({message: 'You do not have permission to access this resource.'})
})

eventEmitter.on('API:NOT_FOUND', () => {
  ElMessage.error({ message: 'The resource you are looking for was not found.' })
  router.push('/404')
})

eventEmitter.on('API:METHOD_NOT_ALLOWED', (err: any) => {
  if (err.message) {
    ElMessage.error({ message: err.message})
  } else {
    ElMessage.error('The HTTP method is not allowed for this resource.')
  }
})

eventEmitter.on('API:UNPROCESSABLE_ENTITY', (err: any) => {
  const errorMessage = err.message || 'The request was well-formed but the server could not process it.'
  const fieldErrors = err.errors
  

  if (fieldErrors) {
    for (const [field, msg] of Object.entries(fieldErrors)) {
      ElMessage.error({ message: `${field}: ${msg}` })
    }
  } else {
    ElMessage.error({ message: errorMessage })
  }
})


export default router

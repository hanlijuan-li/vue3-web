import { useAuthStore } from "@/stores/modules/auth"
import router from '@/router/index'
import { defineAsyncComponent } from 'vue';
// import { RouteRecordRaw } from 'vue-router'

// 引入views 文件夹下的Vue文件
const modules = import.meta.glob('@/views/**/*.vue')

export const initDynamicRouter = async () => {
    const authStore = useAuthStore()

    // 1. 获取菜单列表
    await authStore.getAuthMenuList()

    // 1. 判断当前用户是否有查看菜单权限
    if (!authStore.authMenuList.length) {
        alert('無權限訪問！')
        return Promise.reject('No Permission')
    }

    // 2. 添加动态路由    
    authStore.flatMenuListGet.forEach(item => {     
      
        if (item.component && typeof item.component === 'string') { 
            const component = defineAsyncComponent(() => import('../../views' + item.component + '.vue'))
            // const component = defineAsyncComponent(() => { 
            //     const pathWithAlias = `@/views${item.component}.vue`
            //     const resolvePath = pathWithAlias.replace(/^@/, '/src')
            //     return import(resolvePath)
            // })
            const routeItem = { ...item, component }
            
            router.addRoute('layout', routeItem)
        }
    })
    
}
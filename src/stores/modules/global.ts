import { defineStore } from "pinia";

export const useGlobalStore = defineStore({
    id: 'global',
    state: () => ({
        // 折叠菜单
        isCollapse: false,
        // 面包屑导航栏图标
        breadcrumbIcon: true,
        // 当前语言系统
        language: 'zh'
    }),
    actions: {
        setGlobalState(...args) {
            // [] 动态对象键名，如果args[0] 外面不包一层[] 会被当作常量字符串
            this.$patch({ [args[0]]: args[1] })
        }
    }
})
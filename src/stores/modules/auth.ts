// import { AuthMenuItem } from "@/api/interface";
import { getAuthMenuList } from "@/api/modules/login";
import { getFlatMenuList, getShowMenuList } from "@/utils";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // 菜单权限列表
        authMenuList: [],

    }),
    getters: {
        // 菜单权限列表
        authMenuListGet: state => state.authMenuList,
        // 菜单权限列表 ==> 扁平化之后的一维数组菜单
        flatMenuListGet: state => getFlatMenuList(state.authMenuList),
        // 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isHide === true
        showMenuListGet: state => getShowMenuList(state.authMenuList)
    },
    actions: {
        async getAuthMenuList() {
            const { data } = await getAuthMenuList()
            this.authMenuList = data
        }
    }
})
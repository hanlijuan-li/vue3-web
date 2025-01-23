import { HOME_URL } from '@/config'

export const staticRouter = [
    {
        path: '/',
        redirect: HOME_URL
    },
    {
        path: '/layout',
        name: 'layout',
        component: () => import('@/layouts/index.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue')
    }
]

export const errorRouter = [
    {
        path: '/test',
        name: 'TestView',
        component: () => import('@/views/TestView.vue'),
        meta: {
            title: 'TestView'
        }
    },
    {
        path: '/401',
        name: '401',
        component: () => import('@/views/401.vue'),
        meta: {
            title: 'Unauthorized'
        }
    },
    {
        path: '/403',
        name: '403',
        component: () => import('@/views/403.vue'),
        meta: {
            title: '403'
        }
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404.vue'),
        meta: {
            title: 'Not Found'
        }
    },
    {
        path: '/500',
        name: '500',
        component: () => import('@/views/500.vue'),
        meta: {
            title: '500'
        }
    },
    {
        path: "/:pathMatch(.*)*",
        component: () => import('@/views/404.vue')
    }
]
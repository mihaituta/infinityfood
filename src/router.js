import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './components/auth/login'
import Users from './components/admin/users'
import Stores from './components/admin/stores'
import Menus from './components/staff/menus'
import Store from './components/staff/store'
import store from './store/store'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {path: '/', name: 'home', component: Home},
        {path: '/login', name: 'login', component: Login},
        {
            path: '/admin/users',
            name: 'users',
            component: Users,
            meta: {requiresAuth: true, adminAuth: true, staffAuth: false}
        },
        {
            path: '/admin/stores',
            name: 'stores',
            component: Stores,
            meta: {requiresAuth: true, adminAuth: true, staffAuth: false}
        },
        {
            path: '/staff/menus',
            name: 'menus',
            component: Menus,
            meta: {requiresAuth: true, adminAuth: false, staffAuth: true}
        },
        {
            path: '/staff/store',
            name: 'store',
            component: Store,
            meta: {requiresAuth: true, adminAuth: false, staffAuth: true}
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        const token = localStorage.getItem('token')
        if (!token) next({name: 'login'})
        else if (to.meta.adminAuth) {
            if (store.getters.role_id === null) {
                const watcher = store.watch(() => store.getters.role_id, role_id => {
                    watcher()
                    if (role_id === 1) next()
                    else next('/login')
                })
            } else if (store.getters.role_id === 1) next();
            else next('/');
        } else if (to.meta.staffAuth) {
            if (store.getters.role_id === null) {
                const watcher = store.watch(() => store.getters.role_id, role_id => {
                    watcher()
                    if (role_id === 2) next()
                    else next('/login')
                })
            } else if (store.getters.role_id === 2) next();
            else next('/');
        }
    } else next()
})

export default router

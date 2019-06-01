import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './components/auth/login'
import Users from './components/admin/users'
import Stores from './components/admin/stores'
import Menus from './components/staff/menus'
import Store from './components/staff/store'
import Error from './views/Error404'
import store from './store/store'
import axios from "axios";
import StoresList from './views/StoresList';

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {path: '/', name: 'home', component: Home},
        {path: '/login', name: 'login', component: Login},
        {
            path: '/stores',
            name: 'storeslist',
            component: StoresList,
        },
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
        {
            path: "*",
            name: 'error',
            component: Error,
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        const token = localStorage.getItem('token')
        if (token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        }
        if (!token) next({name: 'login'})
        else if (to.meta.adminAuth) {
            if (store.getters.role_id === null) {
                const watcher = store.watch(() => store.getters.role_id, role_id => {
                    watcher()
                    if (role_id === 'Admin') next()
                    else next('/login')
                })
            } else if (store.getters.role_id === 'Admin') next();
            else next('/');
        } else if (to.meta.staffAuth) {
            if (store.getters.role_id === null) {
                const watcher = store.watch(() => store.getters.role_id, role_id => {
                    watcher()
                    if (role_id === 'Staff') next()
                    else next('/login')
                })
            } else if (store.getters.role_id === 'Staff') next();
            else next('/');
        }
    } else next()
})

export default router

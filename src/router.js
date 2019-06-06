import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './components/auth/login';
import Users from './components/admin/users';
import Stores from './components/admin/stores';
import Menus from './components/staff/menus';
import EditStore from './components/staff/editStore';
import Error from './views/Error404';
import store from './store/store';
import Store from './views/Store';
import axios from 'axios';
import StoresList from './views/StoresList';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {path: '/', name: 'home', component: Home},
        {path: '/login', name: 'login', component: Login},
        {
            path: '/restaurante',
            name: 'storeslist',
            component: StoresList
        },
        {
            path: '/restaurant/:slug',
            name: 'Store',
            component: Store
        },
        {
            path: '/admin/utilizatori',
            name: 'users',
            component: Users,
            meta: {requiresAuth: true, adminAuth: true, staffAuth: false}
        },
        {
            path: '/admin/magazine',
            name: 'stores',
            component: Stores,
            meta: {requiresAuth: true, adminAuth: true, staffAuth: false}
        },
        {
            path: '/staff/meniuri',
            name: 'menus',
            component: Menus,
            meta: {requiresAuth: true, adminAuth: false, staffAuth: true}
        },
        {
            path: '/staff/magazin',
            name: 'store',
            component: EditStore,
            meta: {requiresAuth: true, adminAuth: false, staffAuth: true}
        },
        {
            path: '*',
            name: 'error',
            component: Error
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        }
        if (!token) next({name: 'login'});
        else if (to.meta.adminAuth) {
            if (store.getters.role_id === null) {
                const watcher = store.watch(() => store.getters.role_id, role_id => {
                    watcher();
                    if (role_id === 'Admin') next();
                    else next('/login');
                });
            } else if (store.getters.role_id === 'Admin') next();
            else next('/');
        } else if (to.meta.staffAuth) {
            if (store.getters.role_id === null) {
                const watcher = store.watch(() => store.getters.role_id, role_id => {
                    watcher();
                    if (role_id === 'Staff') next();
                    else next('/login');
                });
            } else if (store.getters.role_id === 'Staff') next();
            else next('/');
        }
    } else next();
});

export default router;

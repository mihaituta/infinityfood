import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios-auth';
import router from '../router';
import menusStore from './menusStore';
import usersStore from './usersStore';
import restaurantsStore from './restaurantsStore';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: null,
        user: {
            name: null,
            email: null,
            role_id: null
        }
    },
    mutations: {
        authUser(state, userData) {
            state.token = userData.token;
            state.user.name = userData.name;
            state.user.email = userData.email;
            state.user.role_id = userData.role_id;
        },
        clearAuthData(state) {
            state.token = null;
            state.user.name = null;
            state.user.email = null;
            state.user.role_id = null;
        }
    },
    actions: {
        login({commit, state}, authData) {
            return axios.post('/login', {
                email: authData.email,
                password: authData.password
            }).then(res => {
                if(res.data.responseType === 'success'){
                    localStorage.setItem('token', res.data.data.jwt);
                    commit('authUser', {
                        token: res.data.data.jwt,
                        role_id: res.data.data.role_id
                    });
                    if (state.user.role_id === 'Admin')
                        router.replace('/admin/utilizatori');

                    if (state.user.role_id === 'Staff')
                        router.replace('/staff/meniuri');
                }
                return res.data;
            }).catch(error => console.log(error));
        },
        logout({commit}) {
            commit('clearAuthData');
            commit('clearMenus');
            commit('clearUsers');
            localStorage.removeItem('token');
            router.replace('/login');
            delete axios.defaults.headers.common['Authorization'];
        },

        tryAutoLogin({commit}) {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }
            axios.get('/user').then(res => {
                commit('authUser', {
                    token: token,
                    name: res.data.data.name,
                    email: res.data.data.email,
                    role_id: res.data.data.role_id
                });
            }).catch(error => console.log(error));
        }
    },
    getters: {
        user(state) {
            return state.user;
        },
        role_id(state) {
            return state.user.role_id;
        },
        isAuthenticated(state) {
            return state.token !== null;
        }
    },
    modules: {
        menusStore,
        usersStore,
        restaurantsStore
    }
});


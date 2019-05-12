import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: null,
        user: {
            role_id: null
        }
    },
    mutations: {
        authUser(state, userData) {
            state.token = userData.token
            state.user.role_id = userData.role_id
        },
        clearAuthData(state) {
            state.token = null
            state.user.role_id = null
        }
    },
    actions: {
        login({commit, state}, authData) {
            axios.post('/login', {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            })
                .then(res => {
                    console.log(res)
                    localStorage.setItem('token', res.data.data.jwt)
                    commit('authUser', {
                        token: res.data.data.jwt,
                        role_id: res.data.data.role_id
                    })
                    if (state.user.role_id === 1)
                        router.replace('/admin/stores')

                    if (state.user.role_id === 2)
                        router.replace('/staff/store')
                })
                .catch(error => console.log(error))
        },
        logout({commit}) {
            commit('clearAuthData')
            localStorage.removeItem('token')
            router.replace('/login')
            delete axios.defaults.headers.common['Authorization']
        },

        tryAutoLogin({commit}) {
            const token = localStorage.getItem('token')
            if (!token) {
                return
            }
            axios.get('/user').then(res => {
                commit('authUser', {
                    token,
                    role_id: res.data.data.role_id
                })
            }).catch(error => console.log(error))
        },
    },
    getters: {
        user(state) {
            return state.user
        },
        role_id(state) {
            return state.user.role_id
        },
        isAuthenticated(state) {
            return state.token !== null
        }
    }
})


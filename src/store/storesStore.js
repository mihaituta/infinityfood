import axios from '../axios-auth';

const state = {
    stores: [
        {
            id: null,
            name: null,
            slug: null,
            user_id: null,
            images_id: null

        }
    ],
    store: {
        id: null,
        name: null,
        slug: null,
        images_id: null
    }
};

const mutations = {
    getStores(state, payload) {
        state.stores = payload;
    },
    getStore(state,payload){
      state.store = payload;
    },
    deleteStore(state, menu) {
        state.stores.splice(menu, 1);
    },
    clearStores(state) {
        state.stores = null;
    }
};

const actions = {
    getStores({commit}) {
        axios.get('/stores')
            .then(res => {
                console.log(res);
                let stores = [];
                let response = res.data.data;
                response.forEach((store) => {
                    const temp = {
                        id: store.id,
                        name: store.name,
                        slug: store.slug,
                        user_id: store.user_id,
                        images_id: store.images_id
                    };
                    stores.push(temp);
                });
                commit('getStores', stores);
            })
            .catch(error => console.log(error));
    },
    getStore({commit},slug) {
        return axios.get('/store/'+slug)
            .then(res => {
                let response = res.data.data;
                if (res.data.responseType === 'success') {
                    const store = {
                        id: response.id,
                        name: response.name,
                        slug: response.slug,
                        images_id: response.images_id
                    };
                    commit('getStore', store);
                }
                return res.data;
            });
    },
    addStore({commit}, payload) {
        return axios.post('/staff/menu/add', payload)
            .then(res => {
                if (res.data.responseType === 'success')
                    this.dispatch('getMenus');
                return res.data;
            })
            .catch(error => {
                console.log(error);
            });
    },
    editStore({commit}, payload) {
        return axios.post('/staff/menu/' + payload.id, payload.data)
            .then(res => {
                if (res.data.responseType === 'success')
                    this.dispatch('getMenus');
                return res.data;
            })
            .catch(error => {
                console.log(error);
            });
    },
    deleteStore({commit}, id) {
        return axios.delete('/staff/menu/' + id)
            .then(res => {
                console.log(res);
                commit('deleteMenu', id);
                this.dispatch('getMenus');
                return res.data;
            });
    }
};

const getters = {
    stores(state) {
        return state.stores;
    },
    getStoreById: (state) => (id) => {
        return state.menus.find(menu => menu.id === id);
    },
    store(state){
        return state.store;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
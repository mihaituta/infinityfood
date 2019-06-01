import axios from '../axios-auth';

const state = {
    stores: [
        {
            id: null,
            name: null,
            description: null,
            price: null,
            type: null,
            image: null,
            store_id: null
        }
    ]
};

const mutations = {
    getStores(state, payload) {
        state.stores = payload;
    },
    deleteStore(state, menu) {
        state.stores.splice(menu, 1);
    },
    clearStores(state) {
        state.stores = null;

    }
};

const actions = {
    getStores({commit, state}) {
        axios.get('/stores')
            .then(res => {
                console.log(res);
                let stores = [];
                let response = res.data.data;
                response.forEach((store) => {
                    const temp = {
                        id: store.id,
                        name: store.name,
                        url: store.url,
                        user_id: store.user_id,
                        images_id: store.images_id
                    };
                    stores.push(temp);
                });
                commit('getStores', stores);
            })
            .catch(error => console.log(error));
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
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
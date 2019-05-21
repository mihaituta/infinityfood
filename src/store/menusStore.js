import axios from '../axios-auth';

const state = {
    menus: [
        {
            id: null,
            name: null,
            description: null,
            price: null,
            type: null,
            image: null,
            store_id: null
        }
    ],
    menuTypes: []
};

const mutations = {
    getMenus(state, payload) {
        state.menus = payload;
    },
    deleteMenu(state, menu) {
        state.menus.splice(menu, 1);
    },
    clearMenus(state) {
        state.menus = null;
        state.menuTypes = null;
    }
};

const actions = {
    getMenus({commit, state}) {
        axios.get('/staff/menus')
            .then(res => {
                console.log(res);
                let menus = [];
                let response = res.data.data;
                response.forEach((menu) => {
                    const temp = {
                        id: menu.id,
                        name: menu.name,
                        description: menu.description,
                        price: menu.price,
                        type: menu.type,
                        image: menu.image,
                        store_id: menu.store_id
                    };
                    menus.push(temp);
                });
                commit('getMenus', menus);
                const distinct = (value, index, self) => {
                    return self.indexOf(value) === index;
                };
                let type = [];
                for (let i = 0; i < menus.length; i++) {
                    type[i] = menus[i].type;
                }
                state.menuTypes = type.filter(distinct);
            })
            .catch(error => console.log(error));
    },
    addMenu({commit}, payload) {
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
    editMenu({commit}, payload) {
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
    deleteMenu({commit}, id) {
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
    menus(state) {
        return state.menus;
    },
    getMenuById: (state) => (id) => {
        return state.menus.find(menu => menu.id === id);
    },
    menuTypes(state) {
        return state.menuTypes;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
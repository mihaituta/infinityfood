import axios from '../axios-auth';

const state = {
    menus: [],
    menuTypes: []
};

const mutations = {
    getMenus(state, payload) {
        state.menus = payload.menus;
    },
    deleteMenu(state, menu) {
        state.menus.splice(menu,1);
    }
};

const actions = {
    getMenus({commit, state}) {
        axios.get('/staff/menus')
            .then(res => {
                console.log(res);
                commit('getMenus', {
                    menus: res.data.data
                });
                const distinct = (value, index, self) => {
                    return self.indexOf(value) === index;
                };
                let type = [];
                for (let i = 0; i < state.menus.length; i++) {
                    type[i] = state.menus[i].type;
                }

                state.menuTypes = type.filter(distinct);

            })
            .catch(error => console.log(error));
    },
    addMenu({commit, state}, payload) {
        axios.post('/staff/menu/add', payload)
            .then(res => {
                this.dispatch('getMenus');
            })
            .catch(error => console.log(error));
    },
    deleteMenu({commit}, id) {
        axios.delete('/staff/menu/' + id)
            .then(res => {
                console.log(res);
                commit('deleteMenu', id);
                this.dispatch('getMenus');
            });
    }
};

const getters = {
    menus(state) {
        return state.menus;
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
import axios from '../axios-auth';

const state = {
    menus: [],
    menuTypes: [],
    menuError: false
};

const mutations = {
    getMenus(state, payload) {
        state.menus = payload.menus;
    },
    deleteMenu(state, menu) {
        state.menus.splice(menu, 1);
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
    addMenu({commit}, payload) {
       return axios.post('/staff/menu/add', payload)
            .then(res => {
                if(res.data.responseType === 'success')
                    this.dispatch('getMenus');
               return res.data
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
                return res.data
            });
    }
};

const getters = {
    menus(state) {
        return state.menus;
    },
    menuTypes(state) {
        return state.menuTypes;
    },
    menuError(state) {
        return state.menuError;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
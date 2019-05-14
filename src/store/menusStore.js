import axios from "../axios-auth";

const state = {
    menus: [],
    menuTypes: []
}

const mutations = {
    getMenus(state, payload) {
        state.menus = payload.menus
    },

}

const actions = {

    getMenus({commit, state}) {
        axios.get('/staff/menus')
            .then(res => {
                console.log(res)
                commit('getMenus', {
                    menus: res.data.data
                })
                const distinct = (value, index, self) => {
                    return self.indexOf(value) === index;
                }

                let type = [];
                for (let i = 0; i < state.menus.length; i++) {
                    type[i] = state.menus[i].type;

                }
                state.menuTypes = type.filter(distinct)

            })
            .catch(error => console.log(error))
    },
}

const getters = {
    menus(state) {
        return state.menus
    },
    menuTypes(state) {
        return state.menuTypes
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
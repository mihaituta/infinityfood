import axios from '../axios-auth';

const state = {
    orders: [
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

};

const mutations = {
    getMenus(state, payload) {
        state.orders = payload;
    },
    deleteMenu(state, menu) {
        state.orders.splice(menu, 1);
    },
};

const actions = {
    getMenus({commit, state}) {
        axios.get('/staff/menus')
            .then(res => {
                console.log(res);
                let menus = [];
                let response = res.data.data.menus;
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
                commit('getTypes', res.data.data.types);

                // const distinct = (value, index, self) => {
                //     return self.indexOf(value) === index;
                // };
                // let type = [];
                // for (let i = 0; i < menus.length; i++) {
                //     type[i] = menus[i].type;
                // }
                // state.menuTypes = type.filter(distinct);
            })
            .catch(error => console.log(error));
    },
    addOrder({commit}, payload) {
        return axios.post('/restaurant/order', payload)
            .then(res => {
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
    orders(state) {
        return state.orders;
    },
    getOrderById: (state) => (id) => {
        return state.orders.find(order => order.id === id);
    },
};

export default {
    state,
    mutations,
    actions,
    getters
};
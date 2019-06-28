import axios from '../axios-auth';

const state = {
    orders: [
        {
            id: null,
            status: null,
            totalPrice: null,
            menus: null,
            city: null,
            name: null,
            phone: null,
            adresa: null,
            bloc: null,
            scara: null,
            etaj: null,
            apartament: null,
            interfon: null,
            informations: null
        }
    ],

};

const mutations = {
    getOrders(state, payload) {
        state.orders = payload;
    },
    deleteOrder(state, order) {
        state.orders.splice(order, 1);
    },
};

const actions = {
    getOrders({commit}) {
        axios.get('/staff/orders')
            .then(res => {
                console.log(res);
                let orders = [];
                let response = res.data.data;
                response.forEach((order) => {
                    const temp = {
                        id: order.id,
                        status: order.status,
                        totalPrice: order.totalPrice,
                        menus: order.menus,
                        city: order.city,
                        name: order.name,
                        phone: order.phone,
                        adresa: order.adresa,
                        bloc: order.bloc,
                        scara: order.scara,
                        etaj: order.etaj,
                        apartament: order.apartament,
                        interfon: order.interfon,
                        informations: order.informations,
                    };
                    orders.push(temp);
                });
                commit('getOrders', orders);
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
    editOrder({commit}, payload) {
        return axios.post('/staff/order/' + payload.id, payload.data)
            .then(res => {
                if (res.data.responseType === 'success')
                    this.dispatch('getOrders');
                return res.data;
            })
            .catch(error => {
                console.log(error);
            });
    },
    deleteOrder({commit}, id) {
        return axios.delete('/staff/order/' + id)
            .then(res => {
                console.log(res);
                commit('deleteOrder', id);
                this.dispatch('getOrders');
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
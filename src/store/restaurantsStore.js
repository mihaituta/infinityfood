import axios from '../axios-auth';

const state = {
    restaurants: [
        {
            id: null,
            name: null,
            slug: null,
            user_id: null,
            images_id: null

        }
    ],
    restaurant: {
        id: null,
        name: null,
        slug: null,
        images_id: null
    }
};

const mutations = {
    getRestaurants(state, payload) {
        state.restaurants = payload;
    },
    getRestaurant(state, payload) {
        state.restaurant = payload;
    },
    deleteRestaurant(state, menu) {
        state.restaurants.splice(menu, 1);
    },
    clearRestaurants(state) {
        state.restaurants = null;
    }
};

const actions = {
    getRestaurants({commit}) {
        axios.get('/stores')
            .then(res => {
                console.log(res);
                let restaurants = [];
                let response = res.data.data;
                response.forEach((restaurant) => {
                    const temp = {
                        id: restaurant.id,
                        name: restaurant.name,
                        slug: restaurant.slug,
                        user_id: restaurant.user_id,
                        images_id: restaurant.images_id
                    };
                    restaurants.push(temp);
                });
                commit('getRestaurants', restaurants);
            })
            .catch(error => console.log(error));
    },
    getRestaurant({commit}, slug) {
        return axios.get('/store/' + slug)
            .then(res => {
                let response = res.data.data;
                if (res.data.responseType === 'success') {
                    const restaurant = {
                        id: response.id,
                        name: response.name,
                        slug: response.slug,
                        images_id: response.images_id
                    };
                    commit('getRestaurant', restaurant);
                }
                return res.data;
            });
    },
    addRestaurant({commit}, payload) {
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
    editRestaurant({commit}, payload) {
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
    deleteRestaurant({commit}, id) {
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
    restaurants(state) {
        return state.restaurants;
    },
    getRestaurantById: (state) => (id) => {
        return state.menus.find(menu => menu.id === id);
    },
    restaurant(state) {
        return state.restaurant;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
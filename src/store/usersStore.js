import axios from '../axios-auth';

const state = {
    users: [
        {
            id: null,
            name: null,
            email: null,
            role_id: null,
        }
    ],
};

const mutations = {
    getUsers(state, payload) {
        state.users = payload;
    },
    deleteUser(state, user) {
        state.users.splice(user, 1);
    },
    clearUsers(state) {
        state.users = null;
    }
};

const actions = {
    getUsers({commit, state}) {
        axios.get('/admin/users')
            .then(res => {
                console.log(res);
                let users = [];
                let response = res.data.data;
                response.forEach((user) => {
                    const temp = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role_id: user.role_id,
                    };
                    users.push(temp);
                });
                commit('getUsers', users);
            })
            .catch(error => console.log(error));
    },
    addUser({commit}, payload) {
        return axios.post('/admin/user', payload)
            .then(res => {
                if (res.data.responseType === 'success')
                    this.dispatch('getUsers');
                return res.data;
            })
            .catch(error => {
                console.log(error);
            });
    },
    editUser({commit}, payload) {
        return axios.post('/admin/user' + payload.id, payload.data)
            .then(res => {
                if (res.data.responseType === 'success')
                    this.dispatch('getUsers');
                return res.data;
            })
            .catch(error => {
                console.log(error);
            });
    },
    deleteUser({commit}, id) {
        return axios.delete('/admin/user/' + id)
            .then(res => {
                console.log(res);
                commit('deleteUser', id);
                this.dispatch('getUsers');
                return res.data;
            });
    }
};

const getters = {
    users(state) {
        return state.users;
    },
    getUserById: (state) => (id) => {
        return state.users.find(user => user.id === id);
    },
};

export default {
    state,
    mutations,
    actions,
    getters
};
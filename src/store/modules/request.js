import store from '../index'
import axios from 'axios'
import router from '../../router/index'

axios.interceptors.response.use(null, (error) => {
    if (error.response.status === 401) {
        router.push('/auth?message=auth')
    }
})

export default {
    namespaced: true,
    state() {
        return {
            requests: [],
        }
    },
    mutations: {
        setRequests(state, requests) {
            state.requests = requests
        },
        addRequest(state, request) {
            state.requests.push(request)
        },
    },
    actions: {
        async create({dispatch, commit}, payload) {
            try {
                const url = process.env.VUE_APP_FB_URL
                const token = store.getters['auth/token']
                const response = await axios.post(
                    `${url}/requests.json?auth=${token}`,
                    payload
                )
                commit('addRequest', {...payload, id: response.data.name})
                dispatch(
                    'setMessage',
                    {
                        value: 'Заявка успешно создана',
                        type: 'primary',
                    },
                    {root: true}
                )
            } catch (e) {
                dispatch(
                    'setMessage',
                    {
                        value: e.message,
                        type: 'danger',
                    },
                    {root: true}
                )
            }
        },
        async load({dispatch, commit}) {
            try {
                const url = process.env.VUE_APP_FB_URL
                const token = store.getters['auth/token']
                const response = await axios.get(
                    `${url}/requests.json?auth=${token}`
                )
                const reqs = Object.keys(response.data).map((id) => ({
                    ...response.data[id],
                    id,
                }))
                commit('setRequests', reqs)
            } catch (e) {
                dispatch(
                    'setMessage',
                    {
                        value: e.message,
                        type: 'danger',
                    },
                    {root: true}
                )
            }
        },
        async loadById({dispatch}, id) {
            try {
                const url = process.env.VUE_APP_FB_URL
                const token = store.getters['auth/token']
                const response = await axios.get(
                    `${url}/requests/${id}.json?auth=${token}`
                )
                return response.data
            } catch (e) {
                dispatch(
                    'setMessage',
                    {
                        value: e.message,
                        type: 'danger',
                    },
                    {root: true}
                )
            }
        },
        async remove({dispatch}, id) {
            try {
                const url = process.env.VUE_APP_FB_URL
                const token = store.getters['auth/token']
                await axios.delete(`${url}/requests/${id}.json?auth=${token}`)
                dispatch(
                    'setMessage',
                    {
                        value: 'Заявка удалена',
                        type: 'primary',
                    },
                    {root: true}
                )
            } catch (e) {
                dispatch(
                    'setMessage',
                    {
                        value: e.message,
                        type: 'danger',
                    },
                    {root: true}
                )
            }
        },
        async update({dispatch}, request) {
            try {
                const url = process.env.VUE_APP_FB_URL
                const token = store.getters['auth/token']
                await axios.put(
                    `${url}/requests/${request.id}.json?auth=${token}`,
                    request
                )
                dispatch(
                    'setMessage',
                    {
                        value: 'Заявка обновлена',
                        type: 'primary',
                    },
                    {root: true}
                )
            } catch (e) {
                dispatch(
                    'setMessage',
                    {
                        value: e.message,
                        type: 'danger',
                    },
                    {root: true}
                )
            }
        },
    },
    getters: {
        requests(state) {
            return state.requests
        },
    },
}

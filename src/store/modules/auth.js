import axios from 'axios'
import error from '../../utils/error'
const TOKEN_KEY = 'jwt-token'

export default {
    namespaced: true,
    state() {
        return {
            token: localStorage.getItem(TOKEN_KEY) || null,
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            localStorage.setItem(TOKEN_KEY, token)
        },
        logout(state) {
            state.token = null
            localStorage.removeItem(TOKEN_KEY)
        },
    },
    actions: {
        async login({commit, dispatch}, payload) {
            try {
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
                const response = await axios.post(url, {
                    ...payload,
                    returnSecureToken: true,
                })
                commit('setToken', response.data.idToken)
                commit('clearMessage', null, {root: true})
            } catch (e) {
                dispatch(
                    'setMessage',
                    {
                        value: error(e.response.data.error.message),
                        type: 'danger',
                    },
                    {root: true}
                )
                throw new Error()
            }
        },
    },
    getters: {
        token(state) {
            return state.token
        },
        isAuth(state) {
            return !!state.token
        },
    },
}

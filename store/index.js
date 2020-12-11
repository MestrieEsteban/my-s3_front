import Vuex from 'vuex'
import cookies from 'js-cookie'
import api from '~/api'
import { setAuthToken, resetAuthToken } from '~/utils/auth'
const cookieparser = process.server ? require('cookieparser') : undefined

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      auth: null,
      user: null,
    }),
    mutations: {
      setAuth(state, auth) {
        state.auth = auth
      },
      set_user(store, data) {
        store.user = data
      },
      reset_user(store) {
        store.user = null
      },
    },
    actions: {
      nuxtServerInit({ commit }, { req }) {
        let auth = null
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie)
          try {
            auth = JSON.parse(parsed.auth)
          } catch (err) {
            // No valid cookie found
          }
        }
        commit('setAuth', auth)
      },
      login({ commit }, data) {
        return api.auth.login(data).then((response) => {
          try {
            commit('set_user', response.data.data)
            setAuthToken(response.data.data.meta.token)
            cookies.set('x-access-token', response.data.data.meta.token, {
              expires: 7,
            })
            // cookies.set('nickname', response.data.data.user.nickname, { expires: 7 })
            return response
          } catch (error) {
            console.log(response)
            return response
          }
        })
      },
      fetch({ commit }) {
        return api.auth
          .me()
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            commit('reset_user')
            return error
          })
      },
      reset({ commit }) {
        commit('reset_user')
        resetAuthToken()
        cookies.remove('x-access-token')
        return Promise.resolve()
      },
      register({ commit }, data) {
        return api.auth.register(data).then((response) => {
          try {
            commit('set_user', response.data.data)
            setAuthToken(response.data.data.meta.token)
            cookies.set('x-access-token', response.data.data.meta.token, {
              expires: 7,
            })
            return response
          } catch (error) {
            console.log(error)
            return response
          }
        })
      },
      getBucket(data) {
        return api.auth.getBucket(data).then((response) => {
          try {
            return response
          } catch (error) {
            console.log(error)
            return response
          }
        })
      },
    },
  })
}

export default createStore

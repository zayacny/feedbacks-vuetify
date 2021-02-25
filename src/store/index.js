import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const crypto = require('crypto')
const accessToken = window.localStorage.getItem('accessToken')
axios.defaults.headers.common.reqToken = accessToken

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rowsFeedbacks: [],
    token: 'non',
    login: false
  },

  mutations: {
    setFeedbacks (state, data) {
      state.rowsFeedbacks = data
      console.log('mutation setFeedbacls commit!  ')
    },
    setToken (state) {
      state.token = window.localStorage.getItem('accessToken')
    },
    setLogin (state) {
      state.login = true
    }
  },

  actions: {
    // getFeedbacks GET
    async getFeedbacks ({ commit }) {
      const { data } = await axios.get('http://localhost:3000/allfeedbacks')
      commit('setFeedbacks', data)
    },

    // write feedback POST
    async writeFeedback (state, feedback) {
      const { data } = await axios.post('http://localhost:3000/feedbacks', { feedback })
      return data
    },

    // save photo POST
    async savePhoto (state, fileImg) {
      var formData = new FormData()
      formData.append('fileImg', fileImg)
      const { data } = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return data.fileName
    },

    // save User  POST
    async saveUser (state, feedback) {
      const { data } = await axios.post('http://localhost:3000/users', { name: feedback.userName, email: feedback.email, pass: feedback.pass })
      return data
    },

    // update user PUT
    async updateUser (state, payload) {
      const hesh = crypto.createHash('sha1')
      hesh.update(payload.pass)
      const hashPass = hesh.digest('hex')
      const { data } = await axios.post('http://localhost:3000/users/upd', { pass: hashPass, email: payload.email })
      return data.status
    },

    // save Company POST
    async saveCompany (state, feedback) {
      const { data } = await axios.post('http://localhost:3000/company', { name: feedback.orgName, address: feedback.address })
      return data.id_company
    },

    // log in POST
    async logIn ({ commit }, userData) {
      const hesh = crypto.createHash('sha1')
      hesh.update(userData.pass)
      const hashPass = hesh.digest('hex')
      const { data } = await axios.post('http://localhost:3000/login', { name: userData.name, email: userData.email, pass: hashPass })

      if (data) {
        window.localStorage.setItem('accessToken', `${data.accessToken}`)
        commit('setToken')
        commit('setLogin')
        return true
      }
      return false
    },

    // log out
    async logOut (state) {
      state.login = false
      window.localStorage.setItem('accessToken', '')
      return true
    },

    // registration POST
    async regIn (state, userData) {
      const hesh = crypto.createHash('sha1')
      hesh.update(userData.pass)
      const hashPass = hesh.digest('hex')
      const { data } = await axios.post('http://localhost:3000/user', { name: userData.name, email: userData.email, pass: hashPass })
      return data
    },

    // recover password POST
    async forgotPass (state, email) {
      const { data } = await axios.post('http://localhost:3000/recover', { email: email })
      return data
    },

    // fetch email for recover
    async fetchEmailUser (state, token) {
      const { data } = await axios.post('http://localhost:3000/email', { token })
      return data
    }
  },

  getters: {
    getCountFeedbacks (state) {
      return state.rowsFeedbacks.length
    },
    getFeedbacks (state) {
      return state.rowsFeedbacks
    },
    getToken (state) {
      return state.token
    }
  }
})

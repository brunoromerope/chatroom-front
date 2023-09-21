import { createStore } from 'vuex'
import axios from 'axios'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      username: null,
      rooms: [],
      messages: [],
      url: window.location.origin,
      selectedRoom: null,
      conUsers: 0
    }
  },
  mutations: {
    setMessages (state, payload){
        state.messages = payload
    },
    setUsername (state, payload) {
        state.username = payload
    },
    addMessage (state, payload) {
        if (state.selectedRoom?._id ==payload.roomId ){
          state.messages.push(payload)
        }
    },
    setRooms (state, payload) {
        state.rooms = payload
    },
    setRoom (state, payload) {
        state.selectedRoom = payload;
    },
    addRoom (state, payload) {
        state.rooms.push(payload)
    },
    setConUsers (state, payload) {
        state.conUsers = payload
    },
    reset (state) {
      state.username = null
      state.rooms = []
      state.messages = []
      state.selectedRoom = null
      state.conUsers = []
    }
  },
  actions: {
    getMessages ({commit, dispatch}) {
        axios.get(this.state.url+ '/api/messages/'+this.state.selectedRoom._id)
        .then((resu) => {
            commit('setMessages', resu.data.data)
        }).catch((err) => {
            alert(err)
        })
    },
    getRooms ({commit, dispatch}) {
        axios.get(this.state.url+ '/api/rooms')
        .then((resu) => {
            commit('setRooms', resu.data.data)
        }).catch((err) => {
            alert(err)
        })
    },
    newMessage ({commit, dispatch}, payload) {
        axios.post(this.state.url + '/api/message', {
            username: this.state.username,
            text: payload,
            createDate: new Date(),
            roomId: this.state.selectedRoom._id
        })
        .then((resu) => {
            dispatch('getMessages');
        }).catch((err) => {
            alert(err)
        })
        
    },
    newRoom ({commit, dispatch}){
      console.log('entra')
      axios.post(this.state.url + '/api/room', {
        name: this.state.username,
        createDate: new Date()
      })
      .then((resu) => {
          console.log(resu)
          dispatch('getRooms');
      }).catch((err) => {
          alert(err)
      })
    },

  },
  getters: {
    username (state) {
        return state.username
    },
    messages (state) {
        return state.messages
    },
    rooms (state) {
        return state.rooms
    },
    selectedRoom (state) {
        return state.selectedRoom
    },
    conUsers (state) {
        return state.conUsers
    },
    url (state) {
        return state.url
    }
  }
})

export default store
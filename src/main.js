/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import Message from './components/MessageCard.vue'
import Room from './components/RoomCard.vue'
import NavBar from './components/NavBar.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

app.component(
    'Message',
    'Room',
    'NavBar'
)

registerPlugins(app)

//console.log(window.location.href.substring(0, window.location.href.length - 1))
console.log(window.location.origin)

app.mount('#app')

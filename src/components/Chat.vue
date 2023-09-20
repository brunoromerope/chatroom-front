<template>
    <v-container class="mainContainer" v-if="username">
        <v-row>
            <NavBar />
        </v-row>
        <v-row>
            <v-col cols="4">
                <div class="text-center">
                    <h2>Rooms ({{ rooms.length }})</h2>
                </div>
                <div ref="roomsRef" class="rooms">
                    <Room v-for="room in rooms" :key="room._id" :room="room" @click="chooseRoom(room)"/>
                </div>
            </v-col>
            <v-col class="messages-container" cols="8" >
                <div class="text-center">
                    <h2>{{ selectedRoom ? selectedRoom.name + "'s Room" : 'Choose a Room'}}</h2>
                </div>
                <div ref="messagesRef" class="messages">
                    <Message v-for="message in messages" :key="message._id" :message="message"/>
                </div>
                <v-row v-if="selectedRoom">
                    <v-col cols="10">
                        <v-text-field ref="newMessage" class="inputText" v-model="newMessage" @keyup.enter="sendMessage"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-btn class="sendBtn" color="primary" :disabled="newMessage == ''" @click="sendMessage">Send</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Message from './MessageCard.vue'
    import Room from './RoomCard.vue'
    import NavBar from './NavBar.vue'
    import socket from '../plugins/socket';
    
    export default {
        components: {
            Message,
            Room,
            NavBar
        },
        created: function () {
            this.$store.dispatch('getRooms')
            this.$store.dispatch('newRoom')
        },
        mounted () {
            socket.on('message', (data) => {
                this.$store.commit('addMessage', data);
                //this.$nextTick(() => this.scrollToBottom())
            });

            socket.on('room', (data) => {
                this.$store.commit('addRoom', data);
            });

            if (this.selectedRoom){

                this.scrollToBottom()
            }
        },
        data () {
            return {
                newMessage: '',
            }
        },
        computed: {
            username () {
                return this.$store.getters.username
            },
            messages () {
                return this.$store.getters.messages
            },
            rooms () {
                return this.$store.getters.rooms
            },
            selectedRoom () {
                return this.$store.getters.selectedRoom
            }
        },
        watch: {
            messages(){
                this.scrollToBottom()
            }
        },
        methods: {
            sendMessage () {
                this.$store.dispatch('newMessage', this.newMessage)
                
                this.reset();
            },
            chooseRoom (room) {
                this.$store.commit('setRoom', room)
                this.$store.dispatch('getMessages')
                this.$nextTick(() => {
                    this.$refs.newMessage.focus()
                })
            },
            reset () {
                this.newMessage = ''
            },
            scrollToBottom () {
                if (this.selectedRoom){
                    this.$refs.messagesRef.scrollTop = this.$refs.messagesRef.scrollHeight
                }

            },
            logOut () {
                this.$store.commit('reset')
                socket.disconnect()
                location.reload()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mainContainer {
        padding: 10px;
    }

    .messages {
        background-color: lightgoldenrodyellow;
        height: 75vh;
        max-height: 75vh; 
        overflow-y: auto; 
        border: 1px solid #ccc; 
        padding: 10px; 
        margin: 10px;
    }

    .rooms {
        background-color: lightsteelblue;
        height: 75vh;
        max-height: 75vh; 
        overflow-y: auto; 
        border: 1px solid #ccc; 
        padding: 10px; 
        margin: 10px;
    }

    .messages-container {
        border-radius: 20px;
    }

    .inputText {
        width: 100%;
        margin-left: 10px;
    }

    .sendBtn {
        width: 80%;
        height: 60%;
    }

</style>
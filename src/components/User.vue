<template>
    <div class="container">
        <div class="centered-div">
            <div class="text-center">
                <h3>Insert an username</h3>
                <v-text-field label="Username" v-model="username" @keyup.enter="logIn"></v-text-field>
            </div>
            <div class="text-center">
                <v-btn :disabled="username == ''" class="" @click="logIn" >Login</v-btn>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                username: '',
                isLoggedIn: false
            }
        },
        methods: {
            logIn () {
                this.username !== '' ? this.isLoggedIn = true : null
                this.$store.commit('setUsername', this.username)
                this.$router.push('/chat')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        display: grid;
        width: 100%;
        height: 100vh;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
    }

    .centered-div {
        width: 30vw;
        justify-self: center;
        align-self: center;
    }
</style>
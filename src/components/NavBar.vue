<template>
    <v-container>
        <v-row>
            <v-col cols="4" offset-lg="4">
                <div class="text-center">
                    <h1>Welcome, {{ username }}</h1>
                </div>
            </v-col>
            <v-col cols="4">
                <div class="text-right">
                    <v-btn color="red" @click="logOut">Logout</v-btn>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data (){
            return {

            }
        },
        computed: {
            username () {
                return this.$store.getters.username
            }
        },
        methods: {
            logOut () {
                this.$store.commit('reset')
                location.reload()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        display: flex;
        justify-content: center;
    }

    .banner {
        flex-direction: column;
    }

    .content {
        position: relative;
        display: block;
        width: 100%;
        padding: 20px 10px 10px;
    }

</style>
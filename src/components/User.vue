<template>
    <div>
        <div>
            <form>
                <div class="form-inner">
                    <h1>Ingresar usuario</h1>
                    <v-text-field label="Usuario" v-model="username"></v-text-field>
                    <v-btn :disabled="username == ''" class="">Ingresar</v-btn>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        
        data () {
            return {
                username: ''
            }
        }
    }
</script>

<style lang="scss" scoped>
    .form-inner {
        width: 50%;
        text-align: center;
    }
</style>
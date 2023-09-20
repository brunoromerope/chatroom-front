<template>
    <v-container>
        <div class="room">
            <div class="room-inner">
                <div class="content">
                    {{ room.name }}
                </div>
            </div>
        </div>
    </v-container>
</template>

<script>

    export default {
        props: ['room'],
        data () {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>

    .room {
        display: flex;
        margin-bottom: 15px;
    }

    .room-inner {

        width: 100%;
        background-color: whitesmoke;
        border-radius: 999px;
        .content {
            display: inline-block;
            padding: 10px 20px;
            

            color: #333;
            font-size: 18px;
            line-height: 1.2em;
            text-align: left;
        }
    }

    

</style>
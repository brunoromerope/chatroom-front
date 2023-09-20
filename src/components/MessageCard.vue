<template>
    <div ref="card" :class="(isYou) ? 'message current-user' : 'message'">

        <div class="message-inner">
            <div class="username">{{ message.username }}</div>
            <div class="content">{{ message.text }}</div>
            <div class="createDate">{{ formatDate(message.createDate) }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['message'],
        data (){
            return {

            }
        },
        computed: {
            username () {
                return this.$store.getters.username
            },
            isYou () {
                return this.message.username == this.username
            }
        },
        methods: {
            formatDate(dte) {
                let date = new Date(dte);
                // Extract the day, month, year, hour, and minute components
                let day = ("0" + date.getDate()).slice(-2);
                let month = ("0" + (date.getMonth() + 1)).slice(-2);
                let year = date.getFullYear();
                let hour = ("0" + date.getHours()).slice(-2);
                let minute = ("0" + date.getMinutes()).slice(-2);

                // Combine the components and return the formatted date
                return `${day}/${month}/${year} ${hour}:${minute}`;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .message {
        display: flex;
        margin-bottom: 15px;
        
        .message-inner {
            .username {
                color: #888;
                font-size: 16px;
                margin-bottom: 5px;
                padding-left: 15px;
                padding-right: 15px;
            }

            .content {
                display: inline-block;
                padding: 10px 20px;
                background-color: #4dccdd;
                border-radius: 999px;

                color: #333;
                font-size: 18px;
                line-height: 1.2em;
                text-align: left;
            }

            .createDate {
                color: #888;
                font-size: 16px;
                margin-bottom: 5px;
                padding-left: 15px;
                padding-right: 15px;
            }
        }

        &.current-user {
            margin-top: 30px;
            justify-content: flex-end;
            text-align: right;

            .message-inner {
                max-width: 75%;

                .content {
                    color: #FFF;
                    font-weight: 600;
                    background-color: #ea526f;
                }
            }
        }
    }
</style>
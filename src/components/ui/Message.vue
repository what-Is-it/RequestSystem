<template>
    <div v-if="message" :class="['alert', message.type]">
        <p class="alert-title" v-if="title">{{title}}</p>
        <p>{{message.value}}</p>
        <span class="alert-close" @click="close">&times;</span>
    </div>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
export default {
    setup() {
        const store = useStore()
        const TITLE = {
            primary: 'Успешно!',
            danger: 'Ошибка!',
            warning: 'Внимание!'
        }

        const close = () => store.commit('clearMessage')

        const message = computed(()=>store.state.message)
        const title = computed(()=>message.value?TITLE[message.value.type] : '')

        return {message, title, close}
    },
}
</script>

<style lang="css" scoped>
</style>
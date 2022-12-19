<template>
    <div class="navbar">
        <h3>Online Bank</h3>
        <ul class="navbar__menu">
            <li>
                <router-link to="/">Заявки</router-link>
            </li>
            <li>
                <router-link to="/help">Помощь</router-link>
            </li>
            <li>
                <a href="#" @click.prevent="openSidebar">Сообщения</a>
            </li>
            <li>
                <a href="#" @click="logout">Выйти</a>
            </li>
        </ul>
    </div>
</template>

<script>
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
export default {
    setup() {
        const store = useStore()
        const router = useRouter()

        const logout = () => {
            store.commit('auth/logout')
            router.push('/auth')
        }

        return {
            logout,
            openSidebar: () => store.commit('openSidebar')
        }
    },
}
</script>

<style lang="css" scoped>
</style>
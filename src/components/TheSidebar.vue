<template>
    <div class="sidebar" v-if="sidebar">
        <span class="sidebar-close" @click="close">&times;</span>

        <div class="sidebar-content">
            <p>Вы зашли в систему учета заявок. Здесь вы найдете всю информацию про систему и заявки!</p>
        </div>
    </div>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
    export default {
        setup() {
            const store = useStore()

            const sidebar = computed(()=>store.state.sidebar) 
            
            return {sidebar, close: ()=>store.commit('closeSidebar')}
        }
    }
</script>

<style lang="scss" scoped>
</style>
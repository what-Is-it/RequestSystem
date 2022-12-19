<template>
    <Loader v-if="loading" />
    <page title="Список заявок" v-else>
        <template #header>
            <button class="btn primary" @click="modal = true">Создать</button>
        </template>

        <RequestFilter v-model="filter" />
        <request-table :requests="requests"></request-table>

        <teleport to="body">
            <modal v-if="modal" title="Создать заявку" @close="modal=false" @created="modal=false"></modal>
        </teleport>
    </page>
</template>

<script>
import {ref, computed, onMounted} from 'vue'
import Page from '../components/ui/Page.vue'
import RequestTable from '../components/ui/RequestTable'
import RequestFilter from '../components/ui/RequestFilter'
import Modal from '../components/ui/Modal'
import Loader from '../components/ui/Loader'
import { useStore } from 'vuex'
export default {
    setup() {
        const store = useStore()
        const modal = ref(false)
        const loading = ref(false)
        const filter = ref({})

        const requests = computed(()=>store.getters['request/requests']
            .filter((request)=>{
                if(filter.value.name) {
                    return request.fio.toLowerCase().includes(filter.value.name.toLowerCase())
                }
                return request
            })
            .filter((request)=>{
                if(filter.value.status) {
                    return filter.value.status === request.status
                } else
                return request
            })
        )
        /* watch(filter, val => console.log(val)) */
        
        onMounted(async ()=>{
            loading.value = true
            await store.dispatch('request/load')
            loading.value = false
        })

        return {modal, requests, loading, filter}
    },
    components: {Page, RequestTable, Modal, Loader, RequestFilter}
}
</script>

<style lang="css" scoped></style>

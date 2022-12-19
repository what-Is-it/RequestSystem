<template>
    <Loader v-if="loading" />
    <page back title="Заявка" v-else-if="request">
        <p>
            <strong>Имя владельца</strong>
            : {{request.fio}}
        </p>
        <p>
            <strong>Телефон</strong>
            : {{request.phone}}
        </p>
        <p>
            <strong>Сумма</strong>
            : {{currency(request.amount)}}
        </p>
        <p>
            <strong>Статус</strong>
            :
            <Status :type="request.status" />
        </p>

        <div class="form-control">
            <label for="status">Статус</label>
            <select id="status" v-model="status">
                <option value="done">Завершен</option>
                <option value="cancelled">Отменен</option>
                <option value="active">Активен</option>
                <option value="pending">Выполняется</option>
            </select>
        </div>

        <button class="btn danger" @click="remove">Удалить</button>
        <button class="btn" @click="update" v-if="changes">Обновить</button>
    </page>
    <h3 class="text-center text-white" v-else>Заявки с ID = {{id}} нет.</h3>
</template>

<script>
import {ref, onMounted, computed} from 'vue'
import Page from '../components/ui/Page'
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import Loader from '../components/ui/Loader'
import currency from '../utils/currency'
import Status from '../components/ui/Status'
    export default {
        setup() {
            const loading = ref(true)
            const route = useRoute()
            const router = useRouter()
            const store = useStore()
            const request = ref({})
            const status = ref()
            
            onMounted(async ()=>{
                loading.value = true
                request.value = await store.dispatch('request/loadById', route.params.id)
                status.value = request.value?.status 
                loading.value = false
            })
            const changes = computed(() => 
                request.value.status !== status.value
            )

            const remove = async () => {
                await store.dispatch('request/remove', route.params.id)
                router.push('/')
            }
            const update = async () => {
                const data = {...request.value, status: status.value, id: route.params.id}
                await store.dispatch('request/update', data)
                request.value.status = status.value
            }

            return {
                loading, request, id: route.params.id, currency, remove, update, status, changes
            }
        },
        components: {Page, Loader, Status}
    }
</script>

<style lang="scss" scoped>
</style>
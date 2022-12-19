<template>
    <div>
        <div class="modal-backdrop" @click="$emit('close')"></div>
        <div class="modal">
            <h3 v-if="title">{{title}}</h3>

            <form @submit.prevent="onSubmit">
                <div class="form-control" :class="{invalid: fError}">
                    <label for="fio">ФИО</label>
                    <input type="text" id="fio" v-model="fio" @blur="fBlur" />
                    <small v-if="fError">{{fError}}</small>
                </div>
                <div class="form-control" :class="{invalid: pError}">
                    <label for="phone">Телефон</label>
                    <input type="text" id="phone" v-model="phone" @blur="pBlur" />
                    <small v-if="pError">{{pError}}</small>
                </div>
                <div class="form-control" :class="{invalid: aError}">
                    <label for="amount">Суммы</label>
                    <input type="number" id="amount" v-model.number="amount" @blur="aBlur" />
                    <small v-if="aError">{{aError}}</small>
                </div>
                <div class="form-control">
                    <label for="status">Статус</label>
                    <select id="status" v-model="status">
                        <option value="done">Завершен</option>
                        <option value="cancelled">Отменен</option>
                        <option value="active">Активен</option>
                        <option value="pending">Выполняется</option>
                    </select>
                </div>
                <button class="btn primary" :disabled="isSubmitting">Создать</button>
            </form>
        </div>
    </div>
</template>

<script>
import {useStore} from 'vuex'
import {useForm, useField} from 'vee-validate'
import * as yup from 'yup'
    export default {
        emits: ['close', 'created'],
        props: {
            title: {
                type: String,
                required: false
            }
        },
        setup(_,{emit}) {
            const store = useStore()
            const {isSubmitting, handleSubmit} = useForm({
                initialValues: {
                    status: 'active'
                }
            })
            const {value: fio, errorMessage: fError, handleBlur: fBlur} = useField('fio', yup.string().trim().required('Введите ФИО клиента'))
            const {value: phone, errorMessage: pError, handleBlur: pBlur} = useField('phone', yup.string().trim().required('Поле "Телефон" не может быть пустым'))
            const {value: amount, errorMessage: aError, handleBlur: aBlur} = useField('amount', yup.number().required('Введите сумму').min(0,'Сумма не может быть меньше 0'))
            const {value: status} = useField('status')

   

            const onSubmit = handleSubmit(async (values)=> {
                await store.dispatch('request/create', values)
                emit('created')
            })
            return {
                status, isSubmitting, onSubmit, fio , fError, fBlur, phone, pError, pBlur, amount, aError, aBlur
            }
        },
    }
</script>

<style lang="css" scoped>
</style>
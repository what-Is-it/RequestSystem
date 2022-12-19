<template>
    <form class="card" @submit.prevent="onSubmit">
        <h1>Войти в систему</h1>
        <div class="form-control" :class="{invalid: eError}">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" @blur="eBlur" />
            <small v-if="eError">{{ eError }}</small>
        </div>
        <div class="form-control" :class="{invalid: pError}">
            <label for="password">Пароль</label>
            <input type="password" id="password" v-model="password" @blur="pBlur" />
            <small v-if="pError">{{ pError }}</small>
        </div>
        <button class="btn primary" type="submit" :disabled="isSubmitting || isManyAttempts">Войти</button>
        <span
            class="text-danger"
            v-if="isManyAttempts"
        >Вы слишком часто пытаетесь войти в систему. Попробуйте позже</span>
    </form>
</template>

<script>
import {computed, watch} from 'vue'
import {useStore} from 'vuex'
import {useRouter, useRoute} from 'vue-router'
import {useField, useForm} from 'vee-validate'
import error from '../utils/error.js'
import * as yup from 'yup'
export default {
    setup() {
        const store = useStore()
        const router = useRouter()
        const route = useRoute()
        const {handleSubmit, isSubmitting, submitCount} = useForm()
        const MIN_LENGTH = 6
        
        if(route.query.message) {
            store.dispatch('setMessage', {
                value: error(route.query.message),
                type: 'warning'
            })
        }

        const {
            value: email,
            errorMessage: eError,
            handleBlur: eBlur,
        } = useField(
            'email',
            yup
                .string()
                .trim()
                .required('Введите email')
                .email('Введите корректный email')
        )
        const {
            value: password,
            errorMessage: pError,
            handleBlur: pBlur,
        } = useField(
            'password',
            yup
                .string()
                .trim()
                .required('Введите пароль')
                .min(
                    MIN_LENGTH,
                    `Пароль должен быть более ${MIN_LENGTH} символов`
                )
        )

        const isManyAttempts = computed(() => submitCount.value >= 3)
        watch(isManyAttempts, (newVal) => {
            if (newVal) {
                setTimeout(() => (submitCount.value = 0), 2000)
            }
        })

        const onSubmit = handleSubmit(async (values) => {
            console.log('Form', values)
            try {
                await store.dispatch('auth/login', values)
                router.push('/')
            } catch (e) {
                throw new Error('Ошибка авторизации')
            }
        })

        return {
            email,
            password,
            eError,
            pError,
            eBlur,
            pBlur,
            onSubmit,
            isSubmitting,
            isManyAttempts,
        }
    },
}
</script>

<style lang="scss" scoped></style>

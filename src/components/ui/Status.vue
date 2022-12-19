<template>
    <span :class="['badge', className]">{{text}}</span>
</template>

<script>
import {ref, watch} from 'vue'
    export default {
        props: {
            type: {
                type: String,
                required: true,
                validator(value) {
                    return ['active','cancelled','done','pending'].includes(value)
                }
            }
        },
        setup(props) {
            const classes = {
                active: 'primary',
                cancelled: 'danger',
                done: 'cancelled',
                pending: 'warning'
            }
            const texts = {
                active: 'Активен',
                cancelled: 'Отменен',
                done: 'Завершен',
                pending: 'Выполняется'
            }
            const className = ref(classes[props.type])
            const text = ref(texts[props.type])

            watch(props, newValue => {
                className.value = classes[newValue.type]
                text.value = texts[newValue.type]
            })

            return {
                className, text
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
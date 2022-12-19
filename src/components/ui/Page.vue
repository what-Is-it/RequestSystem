<template>
    <div class="breadcrumbs" v-if="back">
        <router-link to="/">Вернуться к списку заявок</router-link>
    </div>
    <div class="card">
        <h1 class="card__title">
            {{title}}
            <slot name="header" />
        </h1>

        <slot />
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        back: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        document.title = `${props.title} | Banks`
        return {}
    },
}
</script>

<style lang="css" scoped></style>
